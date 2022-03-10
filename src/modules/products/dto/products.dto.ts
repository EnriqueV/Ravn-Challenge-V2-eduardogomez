import { IsNotEmpty } from "class-validator";

export class ProductDTO {
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
