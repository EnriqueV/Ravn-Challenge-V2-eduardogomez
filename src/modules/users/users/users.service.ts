import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { User } from '../users.entity';
import { UserDTO } from '../dto/user.dto';
import { UserInputDTO } from '../dto/user-input.dto';
@Injectable()
export class UsersService {
  private readonly manager = getManager();
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly sendGrid: SendGridService,
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

  /*=============================================================================
        funcion para crear codigo
     =============================================================================*/
  async getCode(email: string) {
    const c = await this._userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (c != null) {
      if (c.email) {
        const code = Math.floor(100000 + Math.random() * 900000);
        await this.mail(email, code);

        const updateCode = this.manager.query(
          `update clientes set code =${code} where email = $1`,
          [email],
        );

        if (updateCode) {
          return 'update succesfull';
        }

        throw new BadRequestException('error al actualizar');
      } else {
        throw new NotFoundException('correo no existe');
      }
    } else {
      throw new NotFoundException('Credenciales no validas');
    }
  }

  /*=============================================================================
   funcion para validar codigo
=============================================================================*/
  async validateCode(code: string) {
    const c = await this._userRepository.findOne({
      where: {
        code: code,
      },
    });

    if (c != null) {
      if (c.code) {
        return true;
      } else {
        throw new NotFoundException('codigo no existe');
      }
    } else {
      throw new NotFoundException('Codigo no valido');
    }
  }

  /*=============================================================================
    update password
 =============================================================================*/
  async updatePassword(correo: string, password: string) {
    try {
      const pass = String(password);
      const hash = await bcrypt.hash(pass, 12);
      const setPass = String(hash);
      const email = String(correo);
      const updateCode = this.manager.query(
        `update clientes set password='${setPass}' where email = $1`,
        [email],
      );

      if (updateCode) {
        return 'update succesfull';
      }
    } catch (err) {
      throw new BadRequestException('error al actualizar');
    }
  }

  /*=============================================================================
    send email
    ll




 =============================================================================*/
  async mail(email, code): Promise<void> {
    await this.sendGrid.send({
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: ' Reset password',
      text: `Your security code is ${code}`,
    });
  }
}
