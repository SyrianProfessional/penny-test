import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer, usersFeatureKey } from './user.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(usersFeatureKey, userReducer)],
  providers: [],
})
export class UserStoreModule {}
