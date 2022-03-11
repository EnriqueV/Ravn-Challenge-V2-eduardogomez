import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  id: number;

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
