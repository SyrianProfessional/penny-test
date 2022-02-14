import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../app-state';
import * as userReducer from './user.reducer';

export const selectCustomerState = createFeatureSelector<IUserState>(
  userReducer.usersFeatureKey
);
export const selectUsers = createSelector(
  selectCustomerState,
  (state: IUserState) => state.users
);
