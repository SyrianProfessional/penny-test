import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseURL } from '../config';
import { IQuery } from '../interfaces/query.interface';
import { ErrorsHandler } from './errors-handler.service';


@Injectable()
export class UsersService {
  constructor(
    private https: HttpClient,
    private errorsHandler: ErrorsHandler
  ) {}

  getAllUsers = (params: IQuery) => {
    return this.https
      .get(`${BaseURL}/user/get-all-users`, {
        params: {
          ...params,
        },
      })
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };
}
