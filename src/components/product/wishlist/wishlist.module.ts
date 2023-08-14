import { Module } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { WishlistController } from "./wishlist.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/components/user/user.repository";
import { ProductRepository } from "../product.repository";
import { UserModule } from "src/components/user/user.module";
import { AuthModule } from "src/components/auth/auth.module";
import { AuthService } from "src/components/auth/auth.service";
import { RoleModule } from "src/components/user/role/role.module";
import { Wishlist } from "src/entity/wishlist.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, UserRepository, ProductRepository]),
    AuthModule,
    RoleModule,
    UserModule,
  ],
  providers: [WishlistService, AuthService],
  controllers: [WishlistController],
  exports: [WishlistService],
})
export class WishlistModule {}
