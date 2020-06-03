import { Action } from '@ngrx/store';

export enum SharedActions {
  SetLoading = '[SHARED] Set Loading'
}
export class SetLoading implements Action {
  readonly type = SharedActions.SetLoading;
  constructor(public payload: boolean) { }
}

export type LoadingActions =  SetLoading;
