import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION, {}),
    TranslationModule,

    // my modules
    UserModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
