import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { ProductModule } from 'src/product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
