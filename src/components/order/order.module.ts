import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "../product/product.module";
import { UserModule } from "../user/user.module";
import { ProductRepository } from "../product/product.repository";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";
import { RoleModule } from "../user/role/role.module";
import { Order } from "../../entity/order.entity";
import { ProductOptions } from "src/entity/product-options.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      ProductOptions,
      ProductRepository,
      UserRepository,
    ]),
    ProductModule,
    UserModule,
    AuthModule,
    RoleModule,
  ],
  providers: [OrderService, AuthService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
