import { createAction } from '@ngrx/store';
import { IUser } from 'apps/api/src/app/user/interfaces/user.interface';

export const updateUsersInStore = createAction(
  '[users] update users',
  (users: IUser[]) => ({ users })
);
