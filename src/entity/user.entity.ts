import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Order } from "./order.entity";
import { Role } from "./role.entity";
import { Wishlist } from "./wishlist.entity";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.user, { eager: true })
  @JoinTable({ name: "users_roles" })
  role: Role[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  product: Wishlist[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
