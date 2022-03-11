import { faker } from '@faker-js/faker';

import { ProductInputDTO } from '../modules/products/dto/product-input.dto';
import { ProductDTO } from '../modules/products/dto/products.dto';
import { AbstractFactory } from './abstract.factory';

type ProductInput = Partial<ProductInputDTO>;

export class ProductFactory extends AbstractFactory<ProductDTO> {
  constructor() {
    super();
  }

  make(input: ProductInput = {}): Promise<ProductDTO> {
    return Promise.resolve({
      id: faker.datatype.number(),
      name: input.name || faker.commerce.productName(),
      description: input.description || faker.commerce.productDescription(),
      price: input.price || Number(faker.commerce.price(1, 1000, 2)),
      discount: input.discount || faker.datatype.number({ min: 0, max: 99 }),
      status: input.status || faker.datatype.boolean(),
      created: faker.date.past(faker.datatype.number()).toISOString(),
    });
  }

  makeMany(factorial = 1, input: ProductInput = {}): Promise<ProductDTO[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
