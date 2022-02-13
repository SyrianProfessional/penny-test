import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../../config';
import { TranslationModule } from '../translation/translation.module';
import { UserModule } from '../user/user.module';
import { ProductController } from './product.conntroller';
import { ProductSchema } from './schema/product.schema';
import { ProductService } from './services/product.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: config.tables.Product, schema: ProductSchema },
    ]),

    TranslationModule,
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
