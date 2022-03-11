import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UserInputDTO } from '../dto/user-input.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  // endpoint get one user
  @Get('getone/:id')
  async getOneuser(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    const user = await this._userService.get(id);
    return user;
  }

  // endpoint get all users
  @Get('getAll')
  async allusers(): Promise<UserDTO[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Post()
  async save(@Body() user: UserInputDTO) {
    const u = await this._userService.create(user);
    return u;
  }

  @Get('login/:email/:password')
  async uservalidation(@Param() params): Promise<UserDTO> {
    const cliente = await this._userService.validateUser(
      params.email,
      params.password,
    );
    return cliente;
  }
}
