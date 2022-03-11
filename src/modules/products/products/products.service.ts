
import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products.entity';
import { ProductRepository } from '../products.repository';
import { getManager } from 'typeorm';
@Injectable()
export class ProductsService {

    private readonly manager = getManager();
    constructor(
        @InjectRepository(ProductRepository)
        private readonly _productRepository: ProductRepository,

    ) { }

    async get(id: number): Promise<Product> {
        if (!id) {
            throw new BadRequestException('product id is not specified');
        }

        const product = await this._productRepository.findOne(
            {
                where:
                    { id: id }
            }
        );
        if (!product) {
            throw new NotFoundException('product not found');
        }

        return product;
    }

    async getAll(): Promise<Product[]> {

        const product: Product[] = await this._productRepository.find({
            where: { status: true }
        });


        return product;
    }


    async create(product: Product): Promise<Product> {
        const saveProduct: Product = await this._productRepository.save(product);
        return saveProduct;

    }


    async updateStatus(id:number, status:boolean) {

        const updateCode = this.manager.query(`update products set status =${status} where id = $1`, [id])

          if (updateCode) {
              return 'update succesfull';
          }

          throw new BadRequestException('update error');
}


        async edit(id, producto: Product) {
            const update = await this._productRepository.update({ id: id }, producto)
            return update;
        }


    async deleteProduct(id){
            const product = await this.manager.createQueryBuilder().delete().from(Product).where(
                "id= :id", { id: id },
            )
                .execute();

            return product;
        }




}
