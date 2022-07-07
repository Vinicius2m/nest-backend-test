import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @Column('float')
  total: number;
}
