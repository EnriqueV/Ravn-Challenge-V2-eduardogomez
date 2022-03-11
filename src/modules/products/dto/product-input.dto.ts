import { IsNotEmpty } from 'class-validator';

export class ProductInputDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  status: boolean;
}
