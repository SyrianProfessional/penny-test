import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseURL } from '../config';
import { IResetPassword, ISignInUser } from '../interfaces/user.interface';
import { ErrorsHandler } from './errors-handler.service';

@Injectable()
export class AuthService {
  isAuthenticated = false;
  user = new BehaviorSubject<any>({});
  userData: any;
  currentUser = this.user.asObservable();

  constructor(
    private https: HttpClient,
    private errorsHandler: ErrorsHandler,
    private router: Router
  ) {}

  login = (body: ISignInUser) => {
    return this.https.post(`${BaseURL}/user/signin`, body).pipe(
      map((result: any) => {
        this.setUserToStorage(result.data);
        return result;
      }),
      catchError((e) => this.errorsHandler.handleError(e))
    ) as Observable<any>;
  };
  me = () => {
    const user = this.getUserFromStorage();

    if (user)
      this.https
        .get(`${BaseURL}/user/me`)
        .pipe(
          map((result: any) => {
            this.setUserToStorage(result.data);
            return result;
          }),
          catchError(this.errorsHandler.handleError)
        )
        .subscribe((data) => {});
  };

  signup = (body: ISignInUser) => {
    return this.https.post(`${BaseURL}/user/signup`, body).pipe(
      map((result: any) => {
        this.setUserToStorage(result.data);

        return result;
      }),
      catchError(this.errorsHandler.handleError)
    ) as Observable<any>;
  };

  forgetPassword = (email: string) => {
    return this.https
      .post(`${BaseURL}/user/forget-password`, { email })
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };

  resetPassword = (body: IResetPassword) => {
    return this.https
      .post(`${BaseURL}/user/reset-password`, body)
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };

  checkResetPasswordToken = (token: string) => {
    return this.https
      .post(`${BaseURL}/user/check-reset-password`, { token })
      .pipe(catchError(this.errorsHandler.handleError)) as Observable<any>;
  };

  getUserFromStorage() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }
  setUserToStorage(user: any) {
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.https
      .post(`${BaseURL}/user/logout`, {})
      .pipe(catchError(this.errorsHandler.handleError))
      .subscribe((data) => {});
    localStorage.removeItem('user');
    this.userData = undefined;
  }
}
