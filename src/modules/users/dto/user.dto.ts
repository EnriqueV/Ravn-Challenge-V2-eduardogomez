import { IsNotEmpty } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    alias: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    device_token: string;

}
