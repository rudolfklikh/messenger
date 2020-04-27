import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthState from './components/authentication/store/state/authentication.state';
import * as fromAuthReducer from './components/authentication/store/reducers/authentication.reducers';

export interface State {
  auth: fromAuthState.AuthUserState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuthReducer.authenticationReducers
};


export const getAuthState = createFeatureSelector<fromAuthState.AuthUserState>('auth');
export const getAuthStatus = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.status);
export const getAuthUID = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.UID);
