import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { TranslationService } from '../app/translation/translation.service';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  constructor(private translateService: TranslationService) {}
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    // Optional casting into ObjectId if wanted!
    const notValidId = await this.translateService.translate('notValidId');
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) return value;
      throw new BadRequestException(notValidId);
    }
    throw new BadRequestException(notValidId);
  }
}
