import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { config } from '../../config';
import { TranslationModule } from '../translation/translation.module';
import { UserGuard } from './guards/auth.guard';
import { UserSchema } from './schema/users.schema';
import { UserService } from './services/user.service';
import { LocalStrategy } from './strategies/local.strategie';
import { UserController } from './user.controller';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: config.tables.User, schema: UserSchema },
    ]),

    PassportModule.register({}),
    TranslationModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_EXPIRES_IN}h` },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, UserGuard],
  exports: [UserService, LocalStrategy, UserGuard],
})
export class UserModule {}
