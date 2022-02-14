import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserGuard } from './guards/user.guard';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AntService } from './services/ant.service';
import { AuthService } from './services/auth.service';
import { HttpIntercept } from './services/http-intercept';
import { LanguageService } from './services/language.service';
import { ProductService } from './services/product.service';
import { UsersService } from './services/user.service';
import { AppStoreModule } from './store/app-store.module';
import { userReducer } from './store/users/user.reducer';

registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMessageModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzPageHeaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot([userReducer], {}),

    AppStoreModule,
  ],

  providers: [
    { provide: NZ_I18N, useValue: en_US },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercept,
      multi: true,
    },
    UserGuard,
    AuthService,
    ProductService,
    UsersService,
    LanguageService,
    AntService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
