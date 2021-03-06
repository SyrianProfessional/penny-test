import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @ApiProperty({ required: true, default: 'title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, default: 'description' })
  description: string;
}
export class ProductParamsDto {
  @IsMongoId()
  @ApiProperty({ required: true, default: '' })
  id: string;
}
