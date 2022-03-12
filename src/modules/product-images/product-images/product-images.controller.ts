import { extname } from 'path';
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { getManager } from 'typeorm';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductImagesService } from './product-images.service';
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};

@Controller('product-images')
export class ProductImagesController {
  private readonly manager = getManager();

  constructor(private readonly _imageService: ProductImagesService) {}

  // upload image
  @Post('saveimage')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const filename = String(file.originalname);
          cb(null, `${filename}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file) {
    return file;
  }

  @Post('saveimages')
  @UseInterceptors(
    FilesInterceptor('files[]', 5, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: editFileName,
      }),
    }),
  )
  logFiles(@UploadedFiles() images) {
    const response = [];
    images.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
}
