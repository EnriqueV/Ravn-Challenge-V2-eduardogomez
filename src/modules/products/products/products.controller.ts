import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductDTO } from '../dto/products.dto';
import { ProductInputDTO } from '../dto/product-input.dto';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly _productService: ProductsService) {}

  // endpoint get one
  @Get('getproduct/:id')
  async getOneuser(@Param('id', ParseIntPipe) id: number): Promise<ProductDTO> {
    return await this._productService.get(id);
  }

  // endpoint get all
  @Get('getAll')
  async allproducts(): Promise<ProductDTO[]> {
    return await this._productService.getAll();
  }

  @Post()
  async save(@Body() product: ProductInputDTO): Promise<ProductDTO> {
    return await this._productService.create(product);
  }

  // endpoint get one
  @Get('updateStatus/:id/:status')
  async updateStatus(@Param() params) {
    const product = await this._productService.updateStatus(
      params.id,
      params.status,
    );
    return product;
  }

  @Post('update/:id')
  async updateProduct(@Param() params, @Body() product: ProductInputDTO) {
    const update = await this._productService.edit(params.id, product);
    return update;
  }

  @Get('delete/:id')
  async deleteProduct(@Param() params) {
    const product = await this._productService.deleteProduct(params.id);
    return product;
  }
}
