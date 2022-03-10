
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { User } from '../users.entity';
import { UsersService } from './users.service';
import { getManager } from 'typeorm';

@Controller('users')
export class UsersController {

    private readonly manager = getManager();

    constructor(private readonly _userService: UsersService) {

    }

    // endpoint get one user
    @Get('getone/:id')
    async getOneuser(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
        const user = await this._userService.get(id);
        return user;
    }

    // endpoint get all users
    @Get('getAll')
    async obtenerusuarios(): Promise<User[]> {

        const users = await this._userService.getAll();
        return users;
    }

    @Post()
    async save(@Body() user: User) {
        const u = await this._userService.create(user);
        return u;
    }



}
