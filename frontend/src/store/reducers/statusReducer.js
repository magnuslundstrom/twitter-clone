import { FETCH_TWEET_TYPE } from '../actions/tweets/fetchTweet';
import { COMMENT_TWEET_TYPE } from '../actions/tweets/commentTweet';
import { DELETE_COMMENT_TYPE } from '../actions/tweets/deleteComment';

const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TWEET_TYPE:
      return action.payload;
    case COMMENT_TWEET_TYPE: {
      if (state.hasOwnProperty('comments')) {
        const newState = { ...state };
        newState.comments.unshift(action.payload);
        newState.numComments++;
        return newState;
      }
    }

    case DELETE_COMMENT_TYPE: {
      if (state.hasOwnProperty('comments')) {
        const idx = state.comments.findIndex((comment) => comment.comment_id === action.payload);
        if (idx !== -1) {
          const newState = { ...state };
          newState.comments.splice(idx, 1);
          newState.numComments -= 1;
          return newState;
        }
      }
      return state;
    }

    default:
      return state;
  }
};

export default statusReducer;
