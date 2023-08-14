import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entity/order.entity";
import { ProductOptions } from "src/entity/product-options.entity";
import { Repository } from "typeorm";
import { ProductRepository } from "../product/product.repository";
import { UserRepository } from "../user/user.repository";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderOptions } from "./interface/order-options.interface";
import { Promise } from "bluebird";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ProductOptions)
    private productOptionsRepository: Repository<ProductOptions>
  ) {}

  async createOrder(
    userId: number,
    createOrderDto: CreateOrderDto
  ): Promise<Object> {
    const { address, paymentInfo, products } = createOrderDto;

    const optionsArray = await this.parseCart(products);
    const { allAvailable, productOptions } = await this.availabilityCheck(
      optionsArray
    );

    if (allAvailable) {
      const order = new Order();
      order.userId = userId;
      order.address = address;
      order.paymentInfo = paymentInfo;
      order.productOptions = productOptions;

      try {
        await Promise.all(
          productOptions.map((productOption) => {
            ProductOptions.update(
              { id: productOption.id },
              { quantity: productOption.quantity }
            );
          })
        );
        return await order.save();
      } catch (error) {
        throw new ConflictException("Order not created");
      }
    } else {
      return { message: "Not enough product" };
    }
  }

  async availabilityCheck(
    orderOptions: OrderOptions[]
  ): Promise<{ allAvailable: boolean; productOptions: ProductOptions[] }> {
    const rawProductOptions = await Promise.map(
      orderOptions,
      async (orderOption) => {
        const product = await this.productRepository.getProductById(
          orderOption.productId
        );

        if (!product) {
          return null;
        }

        const { options } = product;

        const filteredOption = options.find(
          (option) =>
            option.color.color === orderOption.color &&
            option.size.size === orderOption.size
        );

        if (filteredOption && filteredOption.quantity >= orderOption.quantity) {
          filteredOption.quantity -= orderOption.quantity;
          return filteredOption;
        }
        return null;
      }
    );

    const productOptions = rawProductOptions.filter(
      (filteredOption) => filteredOption !== null
    );

    const allAvailable = productOptions.length === orderOptions.length;

    return { allAvailable, productOptions };
  }

  async parseCart(products): Promise<OrderOptions[]> {
    const optionsArray = [];

    products.forEach((product) => {
      product.options.forEach((option) => {
        const productOption = {} as {
          productId: number;
          color: string;
          size: string;
          quantity: number;
        };

        productOption.productId = product.productId;
        productOption.color = option.color;
        productOption.size = option.size;
        productOption.quantity = option.quantity;

        optionsArray.push(productOption);
      });
    });

    return optionsArray;
  }
}
