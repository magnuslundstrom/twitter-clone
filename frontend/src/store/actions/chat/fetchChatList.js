export const FETCH_CHAT_LIST_TYPE = 'FETCH_CHAT_LIST';
export const fetchChatListA = () => async (dispatch) => {
  const response = await fetch('/api/get-conversations.php');
  if (!response.ok) return console.log(await response.text());
  const chats = await response.json();

  dispatch({
    type: FETCH_CHAT_LIST_TYPE,
    payload: { chatList: chats, loading: false },
  });
};

/*
    Components using this:
    Chatlist.jsx onMount
*/
