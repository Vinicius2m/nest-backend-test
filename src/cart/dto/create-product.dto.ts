import { IsOptional, IsString } from 'class-validator';
import { Product } from 'src/entities/product.entity';

export class CreateProductDto extends Product {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsString()
  image: string;

  @IsString()
  material: string;

  @IsOptional()
  id: string;

  @IsOptional()
  category: string;

  @IsOptional()
  department: string;

  @IsOptional()
  has_discount: boolean;

  @IsOptional()
  discount_value: string;

  @IsOptional()
  adjective: string;
}
