import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "../user/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleService } from "../user/role/role.service";
import { User } from "src/entity/user.entity";

@Injectable()
export class AuthService {
  static jwtService: any;
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
    private roleService: RoleService,
    private jwtService: JwtService
  ) {}

  // registration
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { email, password } = createUserDto;

    const role = await this.roleService.getRoleByName("CUSTOMER");
    const hashPassword = await bcrypt.hash(password, 5);

    await this.userRepository.signUp(
      {
        ...createUserDto,
        password: hashPassword,
      },
      role
    );
  }

  // login
  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginUserDto);
    return await this.generateToken(user);
  }

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateToken(token: string): Promise<Object> {
    const user = await this.jwtService.verify(token, {
      secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
    });
    return user;
  }

  // validate user by email and password
  private async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findUserByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    } else {
      throw new UnauthorizedException({ message: "Invalid credentials" });
    }
  }
}
