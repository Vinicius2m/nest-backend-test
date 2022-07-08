import {
  Body,
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
import { CreateProductDto } from './dto/create-product.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addProduct(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
  ) {
    try {
      const finalUser = this.cartService.registerProduct(
        createProductDto,
        user.user_id,
      );

      return finalUser;
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
      return this.cartService.removeProduct(product_id, user.user_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('checkout')
  checkout(@CurrentUser() user: User) {
    try {
      return this.cartService.checkout(user.user_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
