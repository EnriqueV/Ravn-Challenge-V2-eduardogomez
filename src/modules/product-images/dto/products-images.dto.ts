import { IsNotEmpty } from 'class-validator';

export class Image {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  productId: number;
}
