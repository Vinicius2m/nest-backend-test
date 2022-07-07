import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
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
  removeProduct(
    @Param('product_id') product_id: string,
    @CurrentUser() user: User,
  ) {
    try {
      return this.cartService.removeProduct(product_id, user.cart.cart_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
