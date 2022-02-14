import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { config } from '../../config';
import { QueryDto } from '../../dto/query.dto';
import { IResponse } from '../../interfaces/response.interface';
import { ValidateMongoId } from '../../pipes/id.pipe';
import { TranslationService } from '../translation/translation.service';
import { UserGuard } from '../user/guards/auth.guard';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './services/product.service';

@ApiTags(config.tables.Product)
@Controller('product')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class ProductController {
  constructor(
    private translateService: TranslationService,
    private productService: ProductService
  ) {}

  @Get('/get-all')
  async getAllProducts(
    @Request() req,
    @Query() query: QueryDto
  ): Promise<IResponse> {
    return {
      data: await this.productService.getAllProducts(req, query),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }
  @Get('/:id/details')
  async getOneProduct(
    @Request() req,
    @Param('id', ValidateMongoId) id: string
  ): Promise<IResponse> {
    return {
      data: await this.productService.getOneProduct(req, id),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }

  @Post('/add-product')
  async addNewProduct(
    @Request() req,
    @Body(ValidationPipe) body: ProductDto
  ): Promise<IResponse> {
    return {
      data: await this.productService.addNewProduct(req, body),
      message: await this.translateService.translate('addNewProductSuccessfully'),
    };
  }

  @Put('/:id/edit-product')
  async editProduct(
    @Request() req,
    @Body() body: ProductDto,
    @Param('id', ValidateMongoId) id: string
  ): Promise<IResponse> {
    return {
      data: await this.productService.editProduct(req, id, body),
      message: await this.translateService.translate('editProductSuccessfully'),
    };
  }

  @Delete('/:id/delete-product')
  async deleteproduct(
    @Request() req,
    @Param('id', ValidateMongoId) id: string
  ): Promise<IResponse> {
    return {
      data: await this.productService.deleteproduct(req, id),
      message: await this.translateService.translate(
        'deleteproductSuccessfully'
      ),
    };
  }
}
