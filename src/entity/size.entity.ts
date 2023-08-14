import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductOptions } from "./product-options.entity";

@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @OneToMany(() => ProductOptions, (options) => options.size)
  options: ProductOptions[];
}
