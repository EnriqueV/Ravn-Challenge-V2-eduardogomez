
import {Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {  Images } from '../product-images.entity';
import {  ProductImagesService } from './product-images.service';
import { getManager } from 'typeorm';
import { diskStorage } from 'multer';
import { FileInterceptor} from '@nestjs/platform-express';
@Controller('product-images')
export class ProductImagesController {

    private readonly manager = getManager();

    constructor(private readonly _imageService:ProductImagesService) {

    }

       // upload image
       @Post('saveimage')
       @UseInterceptors(FileInterceptor('file', {
           storage: diskStorage({
               destination: './uploads/products',
               filename: (req, file, cb) => {
                   //const filename: string = String(file.originalname) + uuidv4();
                   const filename: string = String(file.originalname);
   
                   const extension: string = '.jpg';
   
                   cb(null, `${filename}`)
               }
           })
       }))
       uploadImage(@UploadedFile() file) {
           return 'success';
       }
   

}
