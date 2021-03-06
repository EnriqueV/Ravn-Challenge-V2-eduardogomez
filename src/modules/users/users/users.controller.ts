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
  @Get('getone/:id')
  async getOneuser(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    const user = await this._userService.get(id);
    return user;
  }

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

  @Get('getcode/:email')
  async getCode(@Param() params) {
    const user = await this._userService.getCode(params.correo);
    return user;
  }

  @Get('validateCode/:code')
  async validateCode(@Param() params) {
    const user = await this._userService.validateCode(params.code);
    return user;
  }

  @Get('changepassword/:email/:password')
  async changepasswor(@Param() params) {
    try {
      const user = await this._userService.updatePassword(
        params.correo,
        params.password,
      );
      return user;
    } catch (error) {}
  }
}
