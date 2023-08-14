import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { Role } from "src/entity/role.entity";
import { User } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(createUserDto: CreateUserDto, role: Role): Promise<void> {
    const { firstName, lastName, email, password } = createUserDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.role = [role];

    try {
      await user.save();
    } catch (error) {
      // duplicate username
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return await this.findOne({ where: { id } });
  }
}
