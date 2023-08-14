import { IsNotEmpty, IsString } from "class-validator";
import { ProductOptions } from "src/entity/product-options.entity";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  paymentInfo: string;

  @IsNotEmpty()
  products: ProductOptions[];
}