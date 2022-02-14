import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserStoreModule } from './users/user-store.module';

@NgModule({
  imports: [StoreDevtoolsModule.instrument(), UserStoreModule],
})
export class AppStoreModule {}
