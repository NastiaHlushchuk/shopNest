import { Product } from "src/entity/product.entity";
import { EntityRepository, Like, Repository } from "typeorm";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getAllProducts(): Promise<Product[]> {
    return await this.createQueryBuilder("product")
      .innerJoinAndSelect("product.images", "image")
      .getMany();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.createQueryBuilder("product")
      .innerJoinAndSelect("product.images", "image")
      .innerJoinAndSelect("product.options", "productOptions")
      .innerJoinAndSelect("productOptions.size", "size")
      .innerJoinAndSelect("productOptions.color", "color")
      .where("product.id = :id", { id })
      .getOne();
    return product;
  }

  async productSearch(q: string): Promise<Product[]> {
    return await this.find({ name: Like(`%${q}%`) });
  }
}
