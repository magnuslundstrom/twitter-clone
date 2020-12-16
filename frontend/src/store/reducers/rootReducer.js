import { combineReducers } from 'redux';
import authReducer from './authReducer';
import homeTweetsReducer from './homeTweetsReducer';
import profileReducer from './profileReducer';
import chatListReducer from './chatListReducer';
import chatReducer from './chatReducer';
import searchReducer from './searchReducer';
import followSuggestionsReducer from './followSuggestionsReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  auth: authReducer,
  homeTweets: homeTweetsReducer,
  profile: profileReducer,
  chatList: chatListReducer,
  chatRoom: chatReducer,
  followSuggestions: followSuggestionsReducer,
  searches: searchReducer,
  status: statusReducer,
});
