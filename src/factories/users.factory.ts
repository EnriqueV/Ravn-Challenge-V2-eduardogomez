import { faker } from '@faker-js/faker';

import { UserInputDTO } from '../modules/users/dto/user-input.dto';
import { UserDTO } from '../modules/users/dto/user.dto';
import { AbstractFactory } from './abstract.factory';

type UserInput = Partial<UserInputDTO>;

export class UserFactory extends AbstractFactory<UserDTO> {
  constructor() {
    super();
  }

  make(input: UserInput = {}): Promise<UserDTO> {
    return Promise.resolve({
      id: faker.datatype.number(),
      name: input.name || faker.name.findName(),
      lastname: input.lastname || faker.name.lastName(),
      password: input.password || faker.internet.password(),
      is_active: input.is_active || faker.datatype.boolean(),
      email: input.email || faker.internet.email(),
      code: input.code,
    });
  }

  makeMany(factorial = 1, input: UserInput = {}): Promise<UserDTO[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
