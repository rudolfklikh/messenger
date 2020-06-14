import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthState from './components/authentication/store/state/authentication.state';
import * as fromAuthReducer from './components/authentication/store/reducers/authentication.reducers';
import * as fromSharedState from './shared/store/state/shared.state';
import * as fromSharedReducers from './shared/store/reducers/shared.reducers';
import * as fromUserState from './components/dashboard/store/state/user.state';
import * as fromUserReducers from './components/dashboard/store/reducers/user.reducers';

export interface State {
  auth: fromAuthState.AuthUserState;
  shared: fromSharedState.SharedState;
  user: fromUserState.UserState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuthReducer.authenticationReducers,
  shared: fromSharedReducers.sharedReducers,
  user: fromUserReducers.userReducers
};


export const getAuthState = createFeatureSelector<fromAuthState.AuthUserState>('auth');
export const getSharedState = createFeatureSelector<fromSharedState.SharedState>('shared');
export const getAuthLoggining = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.isLoggining);
export const getAuthStatus = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.status);
export const getAuthUID = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.UID);
export const getAuthLogged = createSelector(getAuthState, (state: fromAuthState.AuthUserState) => state.isLogged);
export const getSharedLoading = createSelector(getSharedState, (state: fromSharedState.SharedState) => state.isLoading);

export const getUserState = createFeatureSelector<fromUserState.UserState>('user');
export const getUserEmail = createSelector(getUserState, (state: fromUserState.UserState) => state.email);
export const getUserUID = createSelector(getUserState, (state: fromUserState.UserState) => state.uid);
export const getUserPhotoURL = createSelector(getUserState, (state: fromUserState.UserState) => state.photoURL);
export const getUserAbout = createSelector(getUserState, (state: fromUserState.UserState) => state.about);
