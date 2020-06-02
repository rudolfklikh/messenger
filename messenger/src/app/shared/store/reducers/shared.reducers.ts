import { SharedState, InitialSharedState } from '../state/shared.state';
import { LoadingActions, SharedActions } from '../actions/shared.actions';


export const sharedReducers = (state = InitialSharedState, action: LoadingActions): SharedState => {
  switch (action.type) {
    case SharedActions.SetLoading: {
      return {
        isLoading: action.payload
      };
    }
    default:
      return state;
  }
};
