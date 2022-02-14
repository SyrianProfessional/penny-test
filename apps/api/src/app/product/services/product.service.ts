import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { config } from 'apps/api/src/config';
import { QueryDto } from 'apps/api/src/dto/query.dto';
import { IList } from 'apps/api/src/interfaces/list.interface';
import { IQuery } from 'apps/api/src/interfaces/query.interface';
import { Model, Types } from 'mongoose';
import { TranslationService } from '../../translation/translation.service';
import { UserService } from '../../user/services/user.service';
import { ProductDto } from '../dto/product.dto';
import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(config.tables.Product) private productModel: Model<IProduct>,
    private translateService: TranslationService,
    private userService: UserService
  ) {}

  private getProductAggregate(
    query,
    req: Request | any,
    type: 'list' | 'one',
    doneMessage?: any,
    errorMessage?: any,
    ...args
  ): Promise<IList> {
    return new Promise(async (resolve, reject): Promise<any> => {
      const _query = req.query as IQuery;

      let page = parseInt(_query.page ? _query.page : '1');
      let size = parseInt(
        _query.pageSize ? _query.pageSize : config.limit + ''
      );

      const pageSize = size > config.limit ? config.limit : size;
      this.productModel
        .aggregate([
          { $match: query },
          {
            $facet: {
              paging: [
                { $count: 'total' },
                {
                  $addFields: {
                    currentPage: page > 0 ? page : 1,
                    pages: { $ceil: { $divide: ['$total', pageSize] } },
                    pageSize: pageSize,
                  },
                },
              ],
              data: [
                { $skip: page > 0 ? (page - 1) * pageSize : 0 },
                { $limit: pageSize },
              ],
            },
          },

          { $unwind: '$paging' },
        ])
        .then(async (data) => {
          resolve(
            type == 'list'
              ? {
                  data: data.length > 0 ? data[0].data : [],
                  paging: data.length > 0 ? data[0].paging : {},

                  message: doneMessage
                    ? await this.translateService.translate(doneMessage)
                    : '',
                }
              : {
                  data: data.length > 0 ? data[0].data[0] : null,
                  message: doneMessage
                    ? await this.translateService.translate(doneMessage)
                    : '',
                }
          );
        })
        .catch(async (e) => {
          reject({
            e,
            message: errorMessage
              ? await this.translateService.translate(errorMessage)
              : '',
          });
        });
    });
  }

  async getAllProducts(req, _query: QueryDto) {
    const { searchWord } = _query;

    const query = {
      'user._id': req.user._id,
      $or: [
        { title: { $regex: searchWord || '', $options: '$i' } },
        { description: { $regex: searchWord || '', $options: '$i' } },
        { 'user.firstname': { $regex: searchWord || '', $options: '$i' } },
        { 'user.lastname': { $regex: searchWord || '', $options: '$i' } },
        { 'user.email': { $regex: searchWord || '', $options: '$i' } },
      ],
    };

    const products = await this.getProductAggregate(query, req, 'list', '', '');

    return products;
  }

  async addNewProduct(req, body: ProductDto) {
   

    const newProduct = await this.productModel.create({
      ...body,
      user: this.userService.returnUser(req.user),
    });

    return newProduct;
  }

  async editProduct(req, _id, body: ProductDto) {
    const productNotFound = await this.translateService.translate(
      'productNotFound'
    );
    const notAllowed = await this.translateService.translate('notAllowed');

    const existProduct = await this.productModel.findOne({ _id });
    if (!existProduct) throw new ConflictException(productNotFound);

    if (existProduct.user?._id + '' != req.user._id + '')
      throw new ConflictException(notAllowed);

    const editedProduct = await this.productModel.findOneAndUpdate(
      { _id },
      { ...body, user: req.user },
      { new: true }
    );

    return editedProduct;
  }

  async getOneProduct(req, _id: string) {
    return await this.getProductAggregate(
      { _id: new Types.ObjectId(_id), 'user._id': req.user._id },
      req,
      'one',
      '',
      ''
    );
  }

  async deleteproduct(req, _id) {
    const productNotFound = await this.translateService.translate(
      'productNotFound'
    );
    const notAllowed = await this.translateService.translate('notAllowed');

    const existProduct = await this.productModel.findOne({ _id });
    if (!existProduct) throw new ConflictException(productNotFound);

    if (existProduct.user?._id + '' != req.user._id + '')
      throw new ConflictException(notAllowed);

    return await this.productModel.findOneAndDelete({ _id: req.params.id });
  }
}
