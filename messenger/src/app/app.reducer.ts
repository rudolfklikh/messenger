import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthState from './components/authentication/store/state/authentication.state';
import * as fromAuthReducer from './components/authentication/store/reducers/authentication.reducers';
import * as fromSharedState from './shared/store/state/shared.state';
import * as fromSharedReducers from './shared/store/reducers/shared.reducers';

export interface State {
  auth: fromAuthState.AuthUserState;
  shared: fromSharedState.SharedState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuthReducer.authenticationReducers,
  shared: fromSharedReducers.sharedReducers
};


export const getAuthState = createFeatureSelector<fromAuthState.AuthUserState>('auth');
export const getSharedState = createFeatureSelector<fromSharedState.SharedState>('shared');
export const getAuthLoggining = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.isLoggining);
export const getAuthStatus = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.status);
export const getAuthUID = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.UID);
export const getAuthLogged = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.isLogged);
export const getSharedLoading = createSelector(getSharedState, (state: fromSharedState.SharedState) => state.isLoading);
