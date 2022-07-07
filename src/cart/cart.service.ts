import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
  ) {}

  create(): Promise<Cart> {
    const cart = this.cartRepository.create({ total: 0 });
    return this.cartRepository.save(cart);
  }

  addProduct(product_id: string) {
    throw new Error('Method not implemented.');
  }

  async removeProduct(product_id: string, cart_id: string) {
    try {
      const product = await this.productService.findOne(product_id);

      const cart = await this.cartRepository.findOneBy({ cart_id });

      cart.products = cart.products.filter(
        (product) => product.product_id !== product_id,
      );

      cart.total -= Number(product.price);

      return await this.cartRepository.save(cart);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
