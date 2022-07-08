import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  readonly order_id: string;

  @Column('float')
  total: number;

  @Column()
  timestamp: Date;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;

  @ManyToMany((type) => Product, { eager: true })
  @JoinTable()
  products: Product[];
}
