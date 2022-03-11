import { faker } from '@faker-js/faker';

import { Image } from '../modules/product-images/dto/products-images.dto';
import { AbstractFactory } from './abstract.factory';

type ProductImage = Partial<Image>;

export class ImageFactory extends AbstractFactory<Image> {
  constructor() {
    super();
  }

  make(input: ProductImage = {}): Promise<Image> {
    return Promise.resolve({
      id: faker.datatype.number(),
      url: input.url || faker.image.fashion(),
      productId: faker.datatype.number(),
    });
  }

  makeMany(factorial = 1, input: ProductImage = {}): Promise<Image[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
