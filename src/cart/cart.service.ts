import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly orderService: OrderService,
  ) {}

  create(): Promise<Cart> {
    const cart = this.cartRepository.create({ total: 0 });
    return this.cartRepository.save(cart);
  }

  async registerProduct(createProductDto: CreateProductDto, user_id: string) {
    try {
      let product = await this.productService.findByName(createProductDto.name);

      if (!product) {
        product = await this.productService.create(createProductDto);
      }

      const user = await this.userService.findOne(user_id);

      const cart = await this.cartRepository.findOneBy({
        cart_id: user.cart.cart_id,
      });

      if (
        cart.products.filter((p) => p.product_id === product.product_id).length
      ) {
        throw new HttpException(
          { message: 'Product already in cart' },
          HttpStatus.BAD_REQUEST,
        );
      }

      cart.products = [...cart.products, product];

      cart.total = cart.products.reduce(
        (acc, cur) => acc + Number(cur.price),
        0,
      );

      await this.cartRepository.save(cart);

      return cart;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async removeProduct(product_id: string, user_id: string) {
    try {
      const product = await this.productService.findOne(product_id);

      if (!product) {
        throw new HttpException(
          { message: 'Product not found' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userService.findOne(user_id);

      const cart = await this.cartRepository.findOneBy({
        cart_id: user.cart.cart_id,
      });

      if (
        !cart.products.filter((p) => p.product_id === product.product_id).length
      ) {
        throw new HttpException(
          { message: 'Product not found in cart' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const productIndex = cart.products.findIndex(
        (p) => p.product_id === product.product_id,
      );

      cart.products.splice(productIndex, 1);

      if (cart.products.length === 0) {
        cart.total = 0;
      } else {
        cart.total -= Number(product.price);
      }

      await this.cartRepository.save(cart);

      return cart;
    } catch (error) {
      if (error.message) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async checkout(user_id: string) {
    try {
      const user = await this.userService.findOne(user_id);

      const cart = user.cart;

      if (cart.products.length === 0) {
        throw new HttpException(
          { message: 'Cart is empty' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const order = await this.orderService.create(cart, user);

      cart.total = 0;

      cart.products = [];

      await this.cartRepository.save(cart);

      return { ...order, user: undefined };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
