import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, Repository } from 'typeorm';
import { Product } from '../products.entity';
import { ProductDTO } from '../dto/products.dto';
import { ProductInputDTO } from '../dto/product-input.dto';
@Injectable()
export class ProductsService {
  private readonly manager = getManager();
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}

  async get(id: number): Promise<ProductDTO> {
    if (!id) {
      throw new BadRequestException('product id is not specified');
    }
    const product = await this._productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async getAll(): Promise<ProductDTO[]> {
    return await this._productRepository.find({
      where: { status: true },
    });
  }

  async create(product: ProductInputDTO): Promise<ProductDTO> {
    const p = await this._productRepository.save(product);
    return p;
  }

  async updateStatus(id: number, status: boolean) {
    const updateCode = this.manager.query(
      `update products set status =${status} where id = $1`,
      [id],
    );

    if (updateCode) {
      return 'update succesfull';
    }

    throw new BadRequestException('update error');
  }

  async edit(id: number, producto: ProductInputDTO) {
    const update = await this._productRepository.update({ id: id }, producto);
    return update;
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    const product = await this.manager
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id= :id', { id: id })
      .execute();

    return product;
  }
}
