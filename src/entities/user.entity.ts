import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 14, unique: true })
  cpf: string;

  @Column()
  password: string;

  @OneToMany((type) => Order, (order) => order.user, { eager: true })
  orders: Order[];

  @OneToOne((type) => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;
}
