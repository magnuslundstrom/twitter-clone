export const SEARCH_MESSAGE_TYPE = 'SEARCH_MESSAGES';

export const searchMessagesA = (term, convId) => async (dispatch) => {
  const res = await fetch(`/api/search-conversation-messages.php?searchTerm=${term}&convId=${convId}`);
  if (!res.ok) return console.log(await res.text());

  const messages = await res.json();

  dispatch({
    type: SEARCH_MESSAGE_TYPE,
    payload: messages,
  });
};
