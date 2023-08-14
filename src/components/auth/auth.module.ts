import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { RoleService } from "../user/role/role.service";
import { JwtStrategy } from "./jwt.strategy";
import { Role } from "src/entity/role.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: 43200,
        },
        secret: configService.get("JWT_ACCESS_SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RoleService, UserService],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
