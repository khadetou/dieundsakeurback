import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decoration';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { User } from 'src/auth/schema/user.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdatePaymentResultDto } from './dto/update-payment.dto';
import { OrderService } from './order.service';
import { Order } from './schema/order-schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //CREATE NEW ORDERS
  @Post()
  @UseGuards(AuthGuard())
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto, user);
  }

  //   GET ORDER BY ID
  @Get('/:id')
  @UseGuards(AuthGuard())
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }
  // UPDATE ORDERTOPAID

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateOderToPaid(
    @Param('id') id: string,
    @Body() updatePaymentResultDto: UpdatePaymentResultDto,
  ): Promise<Order> {
    return this.orderService.updateOrderToPaid(id, updatePaymentResultDto);
  }

  //   UPDATE ORDER TO DELIVERED
  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async updateOrderToDelivered(@Param('id') id): Promise<Order> {
    return await this.orderService.updateOrderToDelivered(id);
  }

  //  GET ALL ORDERS BY ADMIN

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  //   DELETE PRODUCT ORDERED BY ADMIN
  @Delete('/:id')
  async deleteOrder(@Param() id: string): Promise<any> {
    return this.orderService.deleteOrder(id);
  }
}
