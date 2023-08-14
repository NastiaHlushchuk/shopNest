import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "./product.repository";
import { RoleModule } from "../user/role/role.module";
import { Image } from "../../entity/image.entity";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { UserRepository } from "../user/user.repository";
import { WishlistModule } from "./wishlist/wishlist.module";
import { ProductOptions } from "../../entity/product-options.entity";
import { Size } from "../../entity/size.entity";
import { Color } from "../../entity/color.entity";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "./multerOption";
import { Order } from "src/entity/order.entity";
import { OrderService } from "../order/order.service";
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),

    TypeOrmModule.forFeature([
      ProductRepository,
      Image,
      UserRepository,
      ProductOptions,
      Size,
      Color,
      Order,
    ]),
    RoleModule,
    UserModule,
    AuthModule,
    WishlistModule,
  ],
  providers: [ProductService, AuthService, OrderService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
