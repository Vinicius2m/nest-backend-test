import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
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
  ) {}

  create(): Promise<Cart> {
    const cart = this.cartRepository.create({ total: 0 });
    return this.cartRepository.save(cart);
  }

  async registerProduct(createProductDto: CreateProductDto, user_id: string) {
    let product = await this.productService.findByName(createProductDto.name);

    if (!product) {
      product = await this.productService.create(createProductDto);
    }

    const user = await this.userService.findOne(user_id);

    const cart = user.cart;

    cart.products.push(product);

    cart.total += Number(product.price);

    await this.cartRepository.save(cart);

    return user;
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

      const cart = user.cart;

      if (
        !cart.products.filter((p) => p.product_id === product.product_id).length
      ) {
        throw new HttpException(
          { message: 'Product not found in cart' },
          HttpStatus.BAD_REQUEST,
        );
      }

      cart.products = cart.products.filter(
        (incomingProduct) => product.product_id !== incomingProduct.product_id,
      );

      if (cart.products.length === 0) {
        cart.total = 0;
      } else {
        cart.total -= Number(product.price);
      }

      await this.cartRepository.save(cart);

      return user;
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
}
