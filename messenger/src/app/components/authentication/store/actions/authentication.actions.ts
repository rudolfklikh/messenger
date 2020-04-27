import { Action } from '@ngrx/store';
import { status, AuthUserState } from '../state/authentication.state';

export enum AuthActions  {
  SetAuth = '[AUTHENTICATION] Set Authenticated',
  SetUnauth = '[AUTHENTICATION] Set Unauthenticated',
  SetStatus = '[AUTHENTICATION] Set Status',
  SetInitial = '[AUTHENTICATION] Set Initial',
}

export class SetAuthenticated implements Action {
  readonly type = AuthActions.SetAuth;
  constructor(public payload: AuthUserState) {}
}
export class SetUnauthenticated implements Action {
  readonly type = AuthActions.SetUnauth;
  constructor(public payload: AuthUserState) {}
}
export class SetStatus implements Action {
  readonly type = AuthActions.SetStatus;
  constructor(public payload: status) {}
}
export class SetInitial implements Action {
  readonly type = AuthActions.SetInitial;
}

export type AuthenticatedActions = SetAuthenticated | SetUnauthenticated | SetStatus | SetInitial;
