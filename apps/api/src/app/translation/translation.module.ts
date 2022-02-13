import { Module } from '@nestjs/common';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { TranslationService } from './translation.service';

const appRoot = require('app-root-path').path;
console.log('appRoot', appRoot);

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(appRoot, '/dist/apps/api/assets/i18n'),
      },
    }),
  ],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
