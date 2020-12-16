export const FETCH_CHAT_ROOM_TYPE = 'FETCH_CHAT_ROOM_TYPE';
export const fetchChatRoomA = () => async (dispatch, getState) => {
  const convId = getState().chatList.selectedConvId;
  if (convId === '0' || !convId) return;
  const res = await fetch(`/api/get-conversation-messages.php?conversationId=${convId}`);
  if (!res.ok)
    return dispatch({
      type: FETCH_CHAT_ROOM_TYPE,
      payload: {
        messages: [],
        users: [],
        conversationId: false,
      },
    });
  const { conversation } = await res.json();

  dispatch({
    type: FETCH_CHAT_ROOM_TYPE,
    payload: conversation,
  });
};

export const FETCH_CHAT_MESSAGES_ONLY_TYPE = 'FETCH_CHAT_MESSAGES_ONLY';
export const fetchChatMessagesOnlyA = () => async (dispatch, getState) => {
  const convId = getState().chatRoom.validated;
  if (convId === '0' && !convId) return;
  const res = await fetch(`/api/get-conversation-messages-only.php?conversationId=${convId}`);
  if (!res.ok)
    return dispatch({
      payload: [],
    });

  const { messages } = await res.json();

  dispatch({
    type: FETCH_CHAT_MESSAGES_ONLY_TYPE,
    payload: messages,
  });
};
