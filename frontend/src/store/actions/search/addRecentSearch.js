export const ADD_RECENT_SEARCH_TYPE = 'ADD_RECENT_SEARCH';

export const addRecentSearchA = (search) => async (dispatch) => {
  const formData = new FormData();
  formData.append('search', search);

  const response = await fetch('/api/add-recent-search.php', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) return console.log(await response.text());
  dispatch({
    type: ADD_RECENT_SEARCH_TYPE,
    payload: search,
  });
};
