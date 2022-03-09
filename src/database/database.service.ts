/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { parse } from 'path/posix';
import { Configuration } from '../config/config.key';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(confi: ConfigService) {
      return {
        ssl: true,
        extra: {
          ssl: {
            "rejectUnauthorized": false
          }
        },
        type: 'postgres' as 'postgres',
        host: confi.get(Configuration.HOST),
        username: confi.get(Configuration.USERNAME),
        password: confi.get(Configuration.PASSWORD),
        database: confi.get(Configuration.DATABASE),
        port: 25060,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
