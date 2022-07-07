import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Cart } from './cart.entity';

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

  @OneToOne((type) => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;
}
