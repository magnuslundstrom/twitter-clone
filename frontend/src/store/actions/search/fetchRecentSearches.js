export const FETCH_RECENT_SEARCHES_TYPE = 'FETCH_RECENT_SEARCHES';
export const fetchRecentSearchesA = () => async (dispatch) => {
  const response = await fetch('/api/get-recent-searches.php');
  if (!response.ok) return console.log(await response.text());
  const data = await response.json();
  dispatch({
    type: FETCH_RECENT_SEARCHES_TYPE,
    payload: data,
  });
};
