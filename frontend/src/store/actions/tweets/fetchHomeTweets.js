export const FETCH_HOME_TWEETS_TYPE = 'FETCH_HOME_TWEETS';

export const fetchHomeTweetsA = () => async (dispatch, getState) => {
  const skip = getState().homeTweets.skip;

  const response = await fetch(`/api/get-following-tweets.php?skip=${skip}`);
  if (!response.ok) return console.log(await response.text());
  const { tweets } = await response.json();
  dispatch({
    type: FETCH_HOME_TWEETS_TYPE,
    payload: tweets,
  });
};
