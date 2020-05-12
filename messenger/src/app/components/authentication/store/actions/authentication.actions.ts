import { Action } from '@ngrx/store';
import { status, AuthUserState } from '../state/authentication.state';
import { RegInfo } from 'src/app/shared/intefaces/reg-info';
import { User } from 'src/app/shared/intefaces/user';
import { Err } from 'src/app/shared/intefaces/error';

export enum AuthActions {
  SetRegister = '[AUTHENTICATION] Set Register',
  SetLogin = '[AUTHENTICATION] Set Login',
  SetAuth = '[AUTHENTICATION] Set Authenticated',
  SetUnauth = '[AUTHENTICATION] Set Unauthenticated',
  SetStatus = '[AUTHENTICATION] Set Status',
  SetInitial = '[AUTHENTICATION] Set Initial',
  SuccessfulRegister = '[AUTHENTICATION] Successfull  Register',
  FailRegiser = '[AUTHENTICATION] Fail Register',
  SuccessfulLogin = '[AUTHENTICATION] Successfull Login',
  FailLogin = '[AUTHENTICATION] Fail Login',
  SetLoginGoogle = '[AUTHENTICATION] Set Login Google',
  ResetPassword = '[AUTHENTICATION] Reset Password',
  SuccessfulResetPassword = '[AUTHENTICATION] Successful Reset Password',
  FailResetPassword = '[AUTHENTICATION] Fail Reset Password'
}
export class SetRegister implements Action {
  readonly type = AuthActions.SetRegister;
  constructor(public payload: RegInfo) { }
}
export class SuccessfulResetPassword implements Action {
  readonly type = AuthActions.SuccessfulResetPassword;
  constructor(public payload: any) { }
}
export class FailResetPassword implements Action {
  readonly type = AuthActions.FailResetPassword;
  constructor(public payload: any) { }
}


export class ResetPassword implements Action {
  readonly type = AuthActions.ResetPassword;
  constructor(public payload: string) { }
}
export class SetLogin implements Action {
  readonly type = AuthActions.SetLogin;
  constructor(public payload: RegInfo) { }
}

export class SetLoginGoogle implements Action {
  readonly type = AuthActions.SetLoginGoogle;
  constructor(public payload: any) {}
}

export class SetAuthenticated implements Action {
  readonly type = AuthActions.SetAuth;
  constructor(public payload: AuthUserState) { }
}
export class SuccessfullRegister implements Action {
  readonly type = AuthActions.SuccessfulRegister;
  constructor(public payload: string) { }
}
export class SuccessfulLogin implements Action {
  readonly type = AuthActions.SuccessfulLogin;
  constructor(public payload: User) { }
}
export class FailLogin implements Action {
  readonly type = AuthActions.FailLogin;
  constructor(public payload: any) { }
}

export class FailRegister implements Action {
  readonly type = AuthActions.FailRegiser;
  constructor(public payload: string) { }
}
export class SetUnauthenticated implements Action {
  readonly type = AuthActions.SetUnauth;
  constructor(public payload: AuthUserState) { }
}
export class SetStatus implements Action {
  readonly type = AuthActions.SetStatus;
  constructor(public payload: status) { }
}
export class SetInitial implements Action {
  readonly type = AuthActions.SetInitial;
}

export type AuthenticatedActions =
  SetAuthenticated |
  SetUnauthenticated |
  SetStatus |
  SetInitial |
  SuccessfullRegister |
  SetRegister |
  SuccessfullRegister |
  FailRegister |
  FailLogin |
  SuccessfulLogin |
  SetLoginGoogle |
  ResetPassword |
  SuccessfulResetPassword |
  FailResetPassword;
