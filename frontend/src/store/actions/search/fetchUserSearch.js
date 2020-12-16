export const FETCH_USER_SEARCH_TYPE = 'FETCH_USER_SEARCH';
export const fetchUserSearchA = (search) => async (dispatch) => {
  const formData = new FormData();
  formData.append('search', search);
  const response = await fetch('/api/search-users.php', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) return console.log(await response.text());
  const data = await response.json();
  dispatch({
    type: FETCH_USER_SEARCH_TYPE,
    payload: data,
  });
};

export const USER_SEARCH_TERM_TYPE = 'USER_SEARCH_TERM_TYPE';
export const userSearchHandler = (val) => {
  return {
    type: USER_SEARCH_TERM_TYPE,
    payload: val,
  };
};
