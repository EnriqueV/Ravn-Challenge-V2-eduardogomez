import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Images } from '../product-images.entity';
import { Image } from '../dto/products-images.dto';

@Injectable()
export class ProductImagesService {
  private readonly manager = getManager();
  constructor(
    @InjectRepository(Images)
    private readonly _imageRepository: Repository<Images>,
  ) {}

  async getAll(productId): Promise<Image[]> {
    return await this._imageRepository.find({
      where: {
        productId: productId,
      },
    });
  }

  async create(image: Image): Promise<Image> {
    const p = await this._imageRepository.save(image);
    return p;
  }
}
