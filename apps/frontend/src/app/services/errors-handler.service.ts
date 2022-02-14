import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AntService } from './ant.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorsHandler implements ErrorHandler {
  constructor(private antService: AntService, private router: Router) {}
  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      let msg = '';
      if (Array.isArray(error.error?.message)) {
        error.error?.message?.forEach((errorMsg: string) => {
          msg = msg + errorMsg + '\n';
        });
      } else {
        msg = error.error?.message;
      }
      console.log('error is : ', msg);

      this.antService.showMessage(msg, 'error');

      if (!navigator.onLine) {
        // Handle offline error
        this.antService.showMessage('no internet connection !', 'error');
      } else {
        if (error.status === 401) {
          this.router.navigateByUrl('/auth/login');
        }
      }
    } else {
    }

    return '';
  }
}
