import {Body, Controller,Get, Param, ParseIntPipe, Post  } from '@nestjs/common';
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


      // endpoint get one 
      @Get('updateStatus/:id/:status')
      async updateStatus(@Param() params){
        const product= await this._productService.updateStatus(params.id, params.status);
        return product;
    }


    @Post('update/:id')
    async updateProduct(@Param() params, @Body() product: Product) {
        const update = await this._productService.edit(params.id, product);
        return update;
    }


    @Get('delete/:id')
    async deleteProduct(@Param() params){
        const product = await this._productService.deleteProduct(params.id);
        return product;
    }





}
