import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseURL } from '../config';
import { IQuery } from '../interfaces/query.interface';
import { ErrorsHandler } from './errors-handler.service';

@Injectable()
export class ProductService {
  constructor(
    private https: HttpClient,
    private errorsHandler: ErrorsHandler
  ) {}

  getAllProducts = (params: IQuery) => {
    return this.https
      .get(`${BaseURL}/product/get-all`, {
        params: {
          ...params,
        },
      })
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };

  getProductDetails = (productId: string) => {
    return this.https
      .get(`${BaseURL}/product/${productId}/details`)
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };

  editProduct = (productId: string, product: any) => {
    return this.https
      .put(`${BaseURL}/product/${productId}/edit-product`, product)
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };

  addProduct = (product: any) => {
    return this.https
      .post(`${BaseURL}/product/add-product`, product)
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };
  deleteProduct = (productId: string) => {
    return this.https
      .delete(`${BaseURL}/product/${productId}/delete-product`)
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };
}
