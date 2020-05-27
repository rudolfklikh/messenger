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
    case AuthActions.SetStatus: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case AuthActions.SetInitial: {
      return {
        ...initialAuthUserState
      };
    }
    case AuthActions.SetLoaded: {
      return {
        ...state,
        isLoggining: action.payload
      };
    }
    default:
      return state;
  }
};

export const getAuthState = (state: AuthUserState) => state;
