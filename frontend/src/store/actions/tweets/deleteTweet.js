export const DELETE_TWEET_TYPE = 'DELETE_TWEET';

export const deleteTweetA = (tweetId) => async (dispatch) => {
  const response = await fetch(`/api/delete-tweet.php?tweetId=${tweetId}`);
  if (!response.ok) return console.log(await response.text());

  dispatch({
    type: DELETE_TWEET_TYPE,
    payload: tweetId,
  });
};
