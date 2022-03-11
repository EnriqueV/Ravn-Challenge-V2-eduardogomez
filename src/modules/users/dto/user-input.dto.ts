import { IsNotEmpty } from 'class-validator';

export class UserInputDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  is_active: boolean;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
