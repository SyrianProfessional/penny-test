import { Action, createReducer, on } from '@ngrx/store';
import { IUserState } from '../app-state';
import * as CustomerActions from './user.actions';

export const usersFeatureKey = 'users';

export const initialState: IUserState = {
  users: [],
};

export const customerReducer = createReducer(
  initialState,

  on(
    CustomerActions.updateUsersInStore,

    (state: IUserState, { users }) => ({
      ...state,
      users,
    })
  )
);

export function userReducer(
  state: IUserState | undefined,
  action: Action
): any {
  return customerReducer(state, action);
}
