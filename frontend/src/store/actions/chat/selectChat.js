export const SELECT_CHAT_TYPE = 'SELECT_CHAT';
export const selectChatA = (convId) => {
  return {
    type: SELECT_CHAT_TYPE,
    payload: convId,
  };
};
