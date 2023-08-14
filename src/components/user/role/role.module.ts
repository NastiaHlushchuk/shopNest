import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/entity/role.entity";
import { AuthService } from "src/components/auth/auth.service";
import { AuthModule } from "src/components/auth/auth.module";
import { UserRepository } from "../user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRepository]), AuthModule],
  providers: [RoleService, AuthService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
