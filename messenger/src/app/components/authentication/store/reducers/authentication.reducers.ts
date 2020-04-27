import { AuthenticatedActions } from '../actions/authentication.actions';
import { AuthActions } from '../actions/authentication.actions';
import { AuthUserState, initialAuthUserState } from '../state/authentication.state';


export const authenticationReducers = (state = initialAuthUserState, action: AuthenticatedActions): AuthUserState => {
  switch (action.type) {
    case AuthActions.SetAuth: {
      return {
        ...state,
        isLogged: action.payload.isLogged,
        isLoggining: action.payload.isLoggining,
        status: action.payload.status,
        UID: action.payload.UID
      };
    }
    case AuthActions.SetAway: {
      return {
        ...state,
        isLogged: action.payload.isLogged,
        isLoggining: action.payload.isLoggining,
        status: action.payload.status,
        UID: action.payload.UID
      };
    }
    case AuthActions.SetInitial: {
      return {
        ...initialAuthUserState
      };
    }
    default:
      return state;
  }
};

export const getAuthState = (state: AuthUserState) => state;
