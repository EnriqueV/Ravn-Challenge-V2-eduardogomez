import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { Images } from '../product-images.entity';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';

describe('ProductImagesController', () => {
  let controller: ProductImagesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Images])],
      controllers: [ProductImagesController],
      providers: [
        ProductImagesService,
        {
          provide: getRepositoryToken(Images),
          useValue: {
            find: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductImagesController>(ProductImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
