import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  // is user authorized
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const user = this.authService.validateToken(token);

      req.user = user;
      console.log("JWT AUTH GUARD", req.user);

      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}
