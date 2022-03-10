
import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../dto/user.dto';
import { User } from '../users.entity';
import { UserRepository } from '../user.repository';
import { getManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    private readonly manager = getManager();
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,

    ) { }


    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('user id is not specified');
        }

        const user = await this._userRepository.findOne(
            {
                where:
                    { id: id }
            }
        );
        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    async getAll(): Promise<User[]> {

        const users: User[] = await this._userRepository.find({
            where: { is_active: true }
        });


        return users
    }


    async create(user: User): Promise<User> {
        const saveUser: User = await this._userRepository.save(user);
        return saveUser;

    }

     /*=============================================================================
        validate user
    =============================================================================*/
    async validateUser(email: string, password: string): Promise<User> {

        const cliente = await this._userRepository.findOne({
            where: {
                email: email,
            }
        });


        const isMatch = await bcrypt.compare(password, cliente.password);



        if (!cliente || !isMatch) {
            throw new NotFoundException('bad credentials');
        }

        return cliente;
    }

  





}
