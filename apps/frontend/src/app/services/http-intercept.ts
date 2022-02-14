import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercept implements HttpInterceptor {
  
  constructor(private inj: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthService);
    const user = authService.getUserFromStorage();
    let token = '';
    if (user) token = user.token;
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        lang: localStorage.getItem('lang') || 'en',
      }),
    });
    return next.handle(authReq);
  }
}
