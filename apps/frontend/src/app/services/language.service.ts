import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const LNG_KEY = 'lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: any;
  selectedLanguage = new BehaviorSubject(null);

  constructor(private translate: TranslateService) {}

 
}
