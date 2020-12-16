import { FETCH_MESSAGES_TYPE } from '../actions/chat/fetchMessages'
import { CLEAR_MESSAGES_TYPE } from '../actions/chat/clearMessages';
import { PUSH_MESSAGE_TYPE } from '../actions/chat/pushMessage';


const initState = [];
const messagesReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_TYPE:
            return [...state, ...action.payload]
        case CLEAR_MESSAGES_TYPE:
            return [];
        case PUSH_MESSAGE_TYPE:
            return [action.payload, ...state]
        default:
            return state
    }

}

export default messagesReducer