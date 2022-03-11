import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../dto/user.dto';
import { UserRepository } from '../user.repository';
import { UserInputDTO } from '../dto/user-input.dto';
@Injectable()
export class UsersService {
  private readonly manager = getManager();
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(id: number): Promise<UserDTO> {
    if (!id) {
      throw new BadRequestException('user id is not specified');
    }

    const user = await this._userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async getAll(): Promise<UserDTO[]> {
    const users: UserDTO[] = await this._userRepository.find({
      where: { is_active: true },
    });

    return users;
  }

  async create(user: UserInputDTO): Promise<UserDTO> {
    const saveUser: UserDTO = await this._userRepository.save(user);
    return saveUser;
  }

  /*=============================================================================
        validate user
    =============================================================================*/
  async validateUser(email: string, password: string): Promise<UserDTO> {
    const cliente = await this._userRepository.findOne({
      where: {
        email: email,
      },
    });

    const isMatch = await bcrypt.compare(password, cliente.password);

    if (!cliente || !isMatch) {
      throw new NotFoundException('bad credentials');
    }

    return cliente;
  }
}
