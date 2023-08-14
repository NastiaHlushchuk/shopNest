import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Users } from "../user/decorators/users.decorator";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@Controller("")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post("/order")
  @UseGuards(JwtAuthGuard)
  createOrder(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Users() user: User
  ): Promise<Object> {
    return this.orderService.createOrder(user.id, createOrderDto);
  }
}
