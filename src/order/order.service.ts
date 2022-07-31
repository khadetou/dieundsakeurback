import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePaymentResultDto } from './dto/update-payment.dto';
import { Order, OrderDocument } from './schema/order-schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  //CREATE NEW ORDERS
  async createOrder(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
    const {
      orderItems,
      shippingAddress,

      itemsPrice,

      shippingPrice,
      totalPrice,
    } = createOrderDto;
    if (orderItems && orderItems.length === 0) {
      throw new InternalServerErrorException('Order items cannot be empty');
    } else {
      const order = new this.orderModel({
        orderItems,
        user: user._id,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      try {
        return await order.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  //GET ORDER BY ID
  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'name email');
    if (order) {
      return order;
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }

  //UPDATE ORDER TO PAID
  async updateOrderToPaid(
    id: string,
    updatePaymentResultDto: UpdatePaymentResultDto,
  ): Promise<Order> {
    const { _id, status, update_time, email_address } = updatePaymentResultDto;
    const order = await this.orderModel.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        _id,
        status,
        update_time,
        email_address,
      };
      return await order.save();
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }

  //UPDATE ORDER TO DELIVERED
  async updateOrderToDelivered(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (order) {
      order.isShipped = true;
      order.delivereAt = Date.now();
      return await order.save();
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }

  // GET ALL ORDERS BY ADMIN
  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find({}).populate('user', 'name email');
  }

  //  DELETE PRODUCT ORDERED  BY ADMIN
  async deleteOrder(id: string): Promise<any> {
    const order = await this.orderModel.findById(id);
    try {
      if (order) {
        await order.remove();
        return { success: true, message: 'Product deleted successfully' };
      } else {
        throw new NotFoundException('Product not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
