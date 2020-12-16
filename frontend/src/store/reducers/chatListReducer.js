import { FETCH_CHAT_LIST_TYPE } from '../actions/chat/fetchChatList';
import { SELECT_CHAT_TYPE } from '../actions/chat/selectChat';
import { PUSH_CHAT_TYPE } from '../actions/chat/pushChat';
import { CLEAR_CHAT_LIST_TYPE } from '../actions/chat/clearChatList';

const initState = {
  loading: true,
  selectedConvId: '0',
  chatList: [],
};

const chatListReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CHAT_LIST_TYPE:
      return { ...state, ...action.payload, selectedConvId: '0' };
    case SELECT_CHAT_TYPE:
      const newState = { ...state };
      newState.selectedConvId = action.payload;
      return newState;
    case PUSH_CHAT_TYPE:
      return { ...state, chatList: [action.payload, ...state.chatList] };
    case CLEAR_CHAT_LIST_TYPE:
      return { ...initState };
    default:
      return state;
  }
};

export default chatListReducer;
