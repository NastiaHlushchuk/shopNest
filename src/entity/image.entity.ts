import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  altText: string;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
