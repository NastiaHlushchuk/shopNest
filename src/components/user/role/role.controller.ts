import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RoleAuthGuard } from "src/components/auth/guards/role-auth.guard";
import { Role } from "src/entity/role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  // for ADMIN
  @UseGuards(RoleAuthGuard)
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  // for ADMIN
  @UseGuards(RoleAuthGuard)
  @Get("/:role")
  getRole(@Param("role") role: string): Promise<Role> {
    return this.roleService.getRoleByName(role);
  }
}
