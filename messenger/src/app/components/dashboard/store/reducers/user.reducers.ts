import { UserState, InitialUserState } from '../state/user.state';
import { UserActions, UserDataActions } from '../actions/user.actions';


export const userReducers = (state = InitialUserState, action: UserDataActions): UserState => {
  switch (action.type) {
    case UserActions.SetUser: {
      return { ...action.payload };
    }
    case UserActions.SetUserPhotoURL: {
      return {
        ...state,
        photoURL: action.payload
      };
    }
    case UserActions.SetUserInfo: {
      return {
        ...state,
        about: action.payload
      };
    }
    default:
      return state;
  }
};
