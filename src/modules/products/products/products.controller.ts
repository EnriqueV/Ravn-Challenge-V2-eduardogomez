import {Body, Controller,Get, Param, ParseIntPipe, Post  } from '@nestjs/common';
import {  ProductDTO } from '../dto/products.dto';
import {  Product } from '../products.entity';
import {  ProductsService } from './products.service';
import { getManager } from 'typeorm';
@Controller('products')
export class ProductsController {
    private readonly manager = getManager();

    constructor(private readonly _productService: ProductsService) {

    }

      // endpoint get one 
      @Get('getproduct/:id')
      async getOneuser(@Param('id', ParseIntPipe) id: number): Promise<Product> {
          const product = await this._productService.get(id);
          return product
      }
  
      // endpoint get all 
      @Get('getAll')
      async allproducts(): Promise<Product[]> {
  
          const products = await this._productService.getAll();
          return products;
      }
  
      @Post()
      async save(@Body() product: Product) {
          const p = await this._productService.create(product);
          return p;
      }





}
