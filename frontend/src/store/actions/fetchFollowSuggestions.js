export const FETCH_FOLLOW_SUGGESTIONS_TYPE = 'FECTH_FOLLOW_SUGGESTIONS';
export const fetchFollowSuggestionsA = () => async (dispatch) => {
  const response = await fetch('/api/get-follow-suggestions.php');
  if (!response.ok) return console.log(await response.text());

  const data = await response.json();

  dispatch({
    type: FETCH_FOLLOW_SUGGESTIONS_TYPE,
    payload: data,
  });
};
