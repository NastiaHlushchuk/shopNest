import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import csv from "csvtojson";
import { ProductOptions } from "src/entity/product-options.entity";
import { Image } from "src/entity/image.entity";
import { Size } from "src/entity/size.entity";
import { Color } from "src/entity/color.entity";
import { Product } from "src/entity/product.entity";
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(ProductOptions)
    private productOptionsRepository: Repository<ProductOptions>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id: number): Promise<Object> {
    const product = await this.productRepository.getProductById(id);

    return {
      ...product,
      options: [
        {
          displayName: "Color",
          values: product.options.map((item) => item.color.color),
        },
        {
          displayName: "Size",
          values: product.options.map((item) => item.size.size),
        },
      ],
    };
  }

  async productSearch(q: string): Promise<Product[]> {
    return await this.productRepository.productSearch(q);
  }

  /* --------------- UPLOAD --------------- */
  async saveProducts(file: Express.Multer.File): Promise<void> {
    if (file.mimetype !== "text/csv") {
      throw new BadRequestException();
    }
    const productJson = await this.convertCSVtoJson(file);
    if (productJson.length === 0) {
      throw new BadRequestException();
    }
    await this.saveProductTodb(productJson);
  }

  async convertCSVtoJson(file: Express.Multer.File) {
    const csvFilePath = process.cwd() + "/" + file.path;
    const vehicleArray = await csv().fromFile(csvFilePath);
    return vehicleArray;
  }

  // saving to db
  async saveProductTodb(arrProducts): Promise<void> {
    const options = [];

    for (let products of arrProducts) {
      const {
        color,
        size,
        name,
        price,
        descriptionHtml,
        quantity,
        url,
        altText,
      } = products;

      const sizeArr = size.split(" ");
      const colorArr = color.split(" ");
      const arrUrl = url.split(" ");

      const product = await this.productRepository.findOne({
        where: { name: name },
      });

      const productItem = !!product;

      if (!productItem) {
        const product = await this.productRepository.save({
          name,
          price,
          descriptionHtml,
        });

        for (let sizes of sizeArr) {
          const sizeItem = await this.sizeRepository.findOne({
            where: { size: sizes.toUpperCase() },
          });
          for (let colors of colorArr) {
            const colorItem = await this.colorRepository.findOne({
              where: { color: colors.toLowerCase() },
            });
            options.push({
              colorId: colorItem.id,
              sizeId: sizeItem.id,
              productId: product.id,
              quantity: +quantity,
            });
          }
        }
        for (let urls of arrUrl) {
          await this.imageRepository.save({
            url: urls,
            altText: altText,
            productId: product.id,
            product,
          });
        }
        await this.productOptionsRepository.save(options);
      } else {
        for (let sizes of sizeArr) {
          const sizeItem = await this.sizeRepository.findOne({
            where: { size: sizes },
          });
          for (let colors of colorArr) {
            const colorItem = await this.colorRepository.findOne({
              where: { color: colors },
            });
            options.push({
              colorId: colorItem.id,
              sizeId: sizeItem.id,
              productId: product.id,
              quantity: +quantity,
            });
          }
        }

        await this.productOptionsRepository.save(options);
      }
    }
  }
}
