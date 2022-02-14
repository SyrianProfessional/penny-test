import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AntService {
  constructor(private message: NzMessageService) {}

  showMessage(message: string, type = 'success'): void {
    // success error warning
    this.message.create(type, message, {
      nzDuration: 2000,
      nzAnimate: true,
      nzPauseOnHover: true,
    });
  }
}
