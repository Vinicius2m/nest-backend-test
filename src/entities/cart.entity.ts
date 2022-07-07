import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  readonly cart_id: string;

  @Column('float')
  total: number;

  @ManyToMany((type) => Product, { eager: true })
  @JoinTable()
  products: Product[];
}
