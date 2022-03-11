import { IsNotEmpty } from "class-validator";

export class ProductDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    discount:number; string;

    @IsNotEmpty()
    status: boolean;

    @IsNotEmpty()
    created: string;

}
