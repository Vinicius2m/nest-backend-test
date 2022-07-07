import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':product_id')
  addProduct(@Param('product_id') product_id: string) {
    try {
      return this.cartService.addProduct(product_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':product_id')
  removeProduct(@Param('product_id') product_id: string) {
    try {
      return this.cartService.removeProduct(product_id, 'cart_id');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
