import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  readonly product_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column('text')
  image: string;

  @Column()
  material: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  has_discount: boolean;

  @Column({ nullable: true })
  discount_value: string;

  @Column({ nullable: true })
  adjective: string;
}
