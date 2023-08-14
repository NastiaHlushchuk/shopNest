import { UseGuards } from "@nestjs/common";
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Product } from "src/entity/product.entity";
import { RoleAuthGuard } from "../auth/guards/role-auth.guard";
import { ProductService } from "./product.service";

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get("/products")
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get("/products/:id")
  getProductById(@Param("id") id: number): Promise<Object> {
    return this.productService.getProductById(id);
  }

  @Get("/search?")
  productSearch(@Query("q") q: string): Promise<Product[]> {
    return this.productService.productSearch(q);
  }

  @UseGuards(RoleAuthGuard)
  @Post("/upload")
  @UseInterceptors(FileInterceptor("csv"))
  public async addProductsTodb(
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    return this.productService.saveProducts(file);
  }
}
