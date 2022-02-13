
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

const { SWAGGER_TITLE, SWAGGER_DESCRIPTION, SWAGGER_TAG } = process.env;

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .addBearerAuth()
    .addTag(SWAGGER_TAG, '')
    .setVersion('v1');

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
