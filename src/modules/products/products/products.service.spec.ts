import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { ProductFactory } from '../../../factories/products.factory';
import { Product } from '../products.entity';
import { ProductDTO } from './../dto/products.dto';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  const productFactory: ProductFactory = new ProductFactory();
  let product: ProductDTO;
  let products: ProductDTO[];
  const delRes: DeleteResult = {
    affected: 0,
    raw: [],
  };

  beforeAll(async () => {
    product = await productFactory.make();
    products = await productFactory.makeMany(5);
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Product])],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue(products),
            findOne: jest.fn().mockResolvedValue(products?.[2]),
            save: jest.fn().mockResolvedValue(product),
            update: jest.fn().mockResolvedValue({
              affected: 1,
              raw: [],
            }),
            delete: jest.fn().mockResolvedValue(delRes),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of products', async () => {
      const result = await service.getAll();
      expect(result.length).toBeGreaterThan(0);
    });
  });
  describe('getAll', () => {
    it('should return an array of products', async () => {
      const result = await service.getAll();
      expect(result).toEqual(products);
    });
  });
  describe('getOne', () => {
    it('should get a single product', () => {
      expect(service.get(products?.[2]?.id)).resolves.toEqual(products?.[2]);
    });
  });
  describe('insertOne', () => {
    it('should successfully insert a cat', () => {
      const productInput = product;
      delete productInput.id;
      delete productInput.created;
      expect(service.create(productInput)).resolves.toEqual(product);
    });
  });
  describe('updateOne', () => {
    it('should call the update method', async () => {
      const result = await service.edit(product?.id, {
        ...product,
        name: 'Edited',
      });
      expect(result).toEqual({
        affected: 1,
        raw: [],
      });
    });
  });
  describe('deleteOne', () => {
    it('should return deleted successfully', async () => {
      const result: DeleteResult = await service.deleteProduct(
        products?.[3]?.id,
      );
      expect(result).toEqual(delRes);
    });
  });
});
