import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductOptions } from "./product-options.entity";

@Entity()
export class Color extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @OneToMany(() => ProductOptions, (options) => options.color)
  options: ProductOptions[];
}
