import { FETCH_FOLLOW_SUGGESTIONS_TYPE } from '../actions/fetchFollowSuggestions';
import { FOLLOW_USER_TYPE } from '../actions/profile/followUser';
const followSuggestionReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_FOLLOW_SUGGESTIONS_TYPE:
      return action.payload;
    case FOLLOW_USER_TYPE:
      const newState = [...state];
      const idx = newState.findIndex((user) => user.user_id === action.payload);
      if (idx !== -1) {
        newState[idx].followStatus = !newState[idx].followStatus;
        return newState;
      }

    default:
      return state;
  }
};

export default followSuggestionReducer;
