import { FETCH_CHAT_ROOM_TYPE, FETCH_CHAT_MESSAGES_ONLY_TYPE } from '../actions/chat/fetchChatRoom';
import { CLEAR_CHAT_ROOM_TYPE } from '../actions/chat/clearChatRoom';
import { SEND_MESSAGE_TYPE } from '../actions/chat/sendMessage';
import { APPEND_USER_TYPE } from '../actions/chat/appendUser';
import { CREATE_CONVERSATION_TYPE } from '../actions/chat/createConversation';
import { SEARCH_MESSAGE_TYPE } from '../actions/chat/searchMessage';
import { PUSH_MESSAGE_TYPE } from '../actions/chat/pushMessage';

const initState = {
  validated: false, // refers to picked chat
  loading: true,
  messages: [],
  users: [],
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CHAT_ROOM_TYPE: {
      const newState = { ...state };
      newState.loading = false;
      newState.messages = action.payload.messages.reverse();
      newState.users = action.payload.users;
      newState.validated = action.payload.conversationId;
      return newState;
    }
    case APPEND_USER_TYPE: {
      const newState = { ...state };
      newState.users.push(action.payload);
      return newState;
    }

    case SEND_MESSAGE_TYPE: {
      const newState = { ...state };
      newState.messages = newState.messages.concat(action.payload);
      return newState;
    }

    case CREATE_CONVERSATION_TYPE: {
      const newState = { ...state };
      newState.validated = action.payload.validated;
      newState.users = action.payload.users;
      return newState;
    }

    case SEARCH_MESSAGE_TYPE: {
      const newState = { ...state };
      newState.messages = action.payload;
      return newState;
    }

    case PUSH_MESSAGE_TYPE: {
      const newState = { ...state };
      newState.messages = newState.messages.concat(action.payload);
      return newState;
    }

    case FETCH_CHAT_MESSAGES_ONLY_TYPE: {
      const newState = { ...state };
      newState.messages = action.payload.reverse();
      return newState;
    }

    case CLEAR_CHAT_ROOM_TYPE:
      return initState;
    default:
      return state;
  }
};

export default chatReducer;
