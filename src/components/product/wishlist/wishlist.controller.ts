import { Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/components/auth/guards/jwt-auth.guard";
import { Users } from "src/components/user/decorators/users.decorator";
import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import { WishlistService } from "./wishlist.service";

@Controller("wishlist")
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get("")
  @UseGuards(JwtAuthGuard)
  productWishlist(@Users() user: User): Promise<Product[]> {
    return this.wishlistService.getProductWishlist(user.id);
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  addToWishlist(
    @Param("id") productId: number,
    @Users() user: User
  ): Promise<boolean> {
    return this.wishlistService.addToWishlist(productId, user.id);
  }

  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  deleteFromWishlist(
    @Param("id") productId: number,
    @Users() user: User
  ): Promise<boolean> {
    return this.wishlistService.deleteFromWishlist(productId, user.id);
  }
}
