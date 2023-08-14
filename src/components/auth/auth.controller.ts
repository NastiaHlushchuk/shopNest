import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { AdminGuard } from "./guards/admin.guard";

@Controller("")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminGuard)
  @Post("/admin/login")
  adminLogin(
    @Body(ValidationPipe) loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }

  @Post("/signup")
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post("/auth/login")
  signIn(
    @Body(ValidationPipe) loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }
}
