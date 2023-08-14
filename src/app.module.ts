import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./components/auth/auth.module";
import { ProductModule } from "./components/product/product.module";
import { RoleModule } from "./components/user/role/role.module";
import { UserModule } from "./components/user/user.module";
import { TypeOrmConfig } from "./configuration/typeorm.config";
import { WishlistModule } from "./components/product/wishlist/wishlist.module";
import { OrderModule } from "./components/order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    UserModule,
    RoleModule,
    ProductModule,
    AuthModule,
    WishlistModule,
    OrderModule,
  ],
})
export class AppModule {}
