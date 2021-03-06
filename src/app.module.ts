import { Module } from '@nestjs/common';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ConfigService,
    DatabaseModule,
    SendGridModule.forRoot({ apikey: process.env.SENDGRID_KEY }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor() {
    AppModule.port = process.env.PORT;
  }
}
