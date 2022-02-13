

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber, IsOptional,
  IsString,
  Min
} from 'class-validator';

export class QueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    default: 1,
    required: false,
  })
  page!: number;

  @Type(() => Number)
  @IsOptional()


  @IsNumber()
  @ApiProperty({
    type: Number,
    default: 20,
    required: false,
  })
  pageSize!: number;

  @IsOptional()
  @IsString()
  @Transform(searchWord => !searchWord.value ? '' : searchWord.value )
  @ApiProperty({ type: String, default: '', required: false })
  searchWord!: string;
}
