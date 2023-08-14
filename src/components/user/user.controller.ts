import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Users } from "./decorators/users.decorator";
import { UserService } from "./user.service";

@Controller("")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/customer")
  @UseGuards(JwtAuthGuard)
  getUserById(@Users() user: User) {
    return this.userService.getUserById(user.id);
  }
}
