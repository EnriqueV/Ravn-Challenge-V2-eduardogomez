import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { UserFactory } from '../../../factories/users.factory';
import { User } from '../users.entity';
import { UserDTO } from './../dto/user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const userFactory: UserFactory = new UserFactory();
  let user: UserDTO;
  let users: UserDTO[];
  const delRes: DeleteResult = {
    affected: 0,
    raw: [],
  };

  beforeAll(async () => {
    user = await userFactory.make();
    users = await userFactory.makeMany(5);
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(users),
            findOne: jest.fn().mockResolvedValue(users?.[2]),
            save: jest.fn().mockResolvedValue(user),
            update: jest.fn().mockResolvedValue({
              affected: 1,
              raw: [],
            }),
            delete: jest.fn().mockResolvedValue(delRes),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await service.getAll();
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(users);
    });
  });

  describe('getOne', () => {
    it('should get a single user', () => {
      expect(service.get(users?.[2]?.id)).resolves.toEqual(users?.[2]);
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a user', () => {
      const userInput = user;
      delete userInput.id;
      expect(service.create(userInput)).resolves.toEqual(user);
    });
  });
});
