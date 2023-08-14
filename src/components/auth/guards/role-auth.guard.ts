import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/components/user/user.repository";
import { AuthService } from "../auth.service";

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  // is user ADMIN
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const userData = await this.authService.validateToken(token);
      const email = Object.values(userData)[0];
      const { role } = await this.userRepository.findUserByEmail(email);
      const item = role.map((x) => x.role);

      for (let i of item) {
        if (i !== "ADMIN") {
          return false;
        }
        return true;
      }
    } catch (err) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}
