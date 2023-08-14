import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entity/product.entity";
import { Wishlist } from "src/entity/wishlist.entity";
import { Repository } from "typeorm";

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>
  ) {}

  async getProductWishlist(userId: number): Promise<Product[]> {
    const productsInWishlist = [];
    const query = await this.wishlistRepository
      .createQueryBuilder("wishlist")
      .where({ userId })
      .innerJoinAndSelect(`wishlist.product`, "product")
      .innerJoinAndSelect("product.images", "image")
      .getMany();
    for (let i = 0; i < query.length; i++) {
      productsInWishlist.push(query[i].product);
    }
    return productsInWishlist;
  }

  async addToWishlist(productId: number, userId: number): Promise<boolean> {
    await this.wishlistRepository.save({ productId, userId });
    return true;
  }

  async deleteFromWishlist(
    productId: number,
    userId: number
  ): Promise<boolean> {
    await this.wishlistRepository.delete({ productId, userId });
    return true;
  }
}
