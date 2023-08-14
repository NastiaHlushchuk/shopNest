import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Image } from "./image.entity";
import { ProductOptions } from "./product-options.entity";
import { Wishlist } from "./wishlist.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descriptionHtml: string;

  @Column()
  price: number;

  @OneToMany(() => Image, (image) => image.product, { eager: true })
  images: Image[];

  @OneToMany(() => ProductOptions, (options) => options.product)
  options: ProductOptions[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  user: Wishlist[];
}
