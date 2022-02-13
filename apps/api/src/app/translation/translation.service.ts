
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import * as en from './../../assets/i18n/en/index.json';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService) {}

  async translate(key: keyof typeof en, args?: any) : Promise<string> {
    const message :string= await this.i18n.translate(`index.${key}`, {
      lang: 'en',
      args,
    });

    return message;
  }

  async refresh() {
    await this.i18n.refresh();
  }
}
