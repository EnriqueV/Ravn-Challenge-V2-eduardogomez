import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

// import { ProductFactory } from '../../../factories/products.factory';
import { ImageFactory } from '../../../factories/images.factory';
import { Images } from '../product-images.entity';
import { Image } from './../dto/products-images.dto';
import { ProductImagesService } from './product-images.service';

describe('ProductImagesService', () => {
  let service: ProductImagesService;
  // const productFactory: ProductFactory = new ProductFactory();
  const imageFactory: ImageFactory = new ImageFactory();
  let image: Image;
  let images: Image[];
  const delRes: DeleteResult = {
    affected: 0,
    raw: [],
  };

  beforeAll(async () => {
    image = await imageFactory.make();
    images = await imageFactory.makeMany(5);
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Images])],
      providers: [
        ProductImagesService,
        {
          provide: getRepositoryToken(Images),
          useValue: {
            find: jest.fn().mockResolvedValue(images),
            findOne: jest.fn().mockResolvedValue(images?.[2]),
            save: jest.fn().mockResolvedValue(image),
            update: jest.fn().mockResolvedValue({
              affected: 1,
              raw: [],
            }),
            delete: jest.fn().mockResolvedValue(delRes),
          },
        },
      ],
    }).compile();

    service = module.get<ProductImagesService>(ProductImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
