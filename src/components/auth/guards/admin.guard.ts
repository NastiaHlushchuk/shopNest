import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/components/user/user.repository";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { email } = context.switchToHttp().getRequest().body;
      const { role } = await this.userRepository.findUserByEmail(email);
      const item = role.map((x) => x.role);

      for (let i of item) {
        if (i !== "ADMIN") {
          return false;
        }
        return true;
      }
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
