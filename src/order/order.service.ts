import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  create(cart: Cart, user: Partial<User>) {
    const order = this.orderRepository.create({
      products: cart.products,
      total: cart.total,
      timestamp: new Date(),
      user,
    });

    return this.orderRepository.save(order);
  }
}
