import { FETCH_RECENT_SEARCHES_TYPE } from '../actions/search/fetchRecentSearches';
import { FETCH_USER_SEARCH_TYPE, USER_SEARCH_TERM_TYPE } from '../actions/search/fetchUserSearch';
import { ADD_RECENT_SEARCH_TYPE } from '../actions/search/addRecentSearch';
const searchReducer = (
  state = {
    recent: [],
    current: [],
    searchTerm: '',
  },
  action
) => {
  switch (action.type) {
    case FETCH_RECENT_SEARCHES_TYPE:
      return { ...state, recent: action.payload };
    case FETCH_USER_SEARCH_TYPE:
      return { ...state, current: action.payload };
    case USER_SEARCH_TERM_TYPE: {
      const newState = { ...state };
      if (action.payload.length === 0) newState.current = [];
      newState.searchTerm = action.payload;
      return newState;
    }
    case ADD_RECENT_SEARCH_TYPE:
      const newState = { ...state };
      const idx = newState.recent.findIndex((termObj) => {
        return termObj.search_term === action.payload;
      });
      if (idx === -1) {
        newState.recent.unshift({ search_term: action.payload });
        if (newState.recent.length >= 5) {
          newState.recent.pop();
        }
      } else {
        newState.recent.splice(idx, 1);
        newState.recent.unshift({ search_term: action.payload });
      }
      newState.searchTerm = '';
      return newState;

    default:
      return state;
  }
};

export default searchReducer;
