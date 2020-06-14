import { Action } from '@ngrx/store';
import { UserState } from '../state/user.state';

export enum UserActions {
  SetUser = '[USER] Set User',
  SetUserPhotoURL = '[USER] Set Photo URL',
  SetUserInfo = '[USER] Set User Info'
}
export class SetUser implements Action {
  readonly type = UserActions.SetUser;
  constructor(public payload: UserState) { }
}

export class SetUserPhotoURL implements Action {
  readonly type = UserActions.SetUserPhotoURL;
  constructor(public payload: string) { }
}
export class SetUserInfo implements Action {
  readonly type = UserActions.SetUserInfo;
  constructor(public payload: string) { }
}

export type UserDataActions  =  SetUser | SetUserPhotoURL | SetUserInfo;
