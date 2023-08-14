import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
} from "typeorm";
import { Product } from "./product.entity";
import { Color } from "./color.entity";
import { Size } from "./size.entity";
import { Order } from "./order.entity";

@Entity()
export class ProductOptions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;

  @PrimaryColumn()
  sizeId: number;

  @PrimaryColumn()
  colorId: string;

  @ManyToOne(() => Size, (size) => size.options, {
    cascade: true,
    eager: true,
  })
  size: Size;

  @ManyToOne(() => Color, (color) => color.options, {
    cascade: true,
    eager: true,
  })
  color: Color;

  @ManyToOne(() => Product, (products) => products.options, {
    cascade: true,
    eager: true,
  })
  product: Product;

  @ManyToMany(() => Order, (order) => order.productOptions, {
    cascade: true
  })
  order: Order[];
}
