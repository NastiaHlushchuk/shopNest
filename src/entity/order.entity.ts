import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ProductOptions } from "./product-options.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentInfo: string;

  @Column()
  address: string;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToMany(() => ProductOptions, (productOptions) => productOptions.order, {
    onUpdate: "CASCADE"
  })
  @JoinTable({ name: "orders_options" })
  productOptions: ProductOptions[];
}
