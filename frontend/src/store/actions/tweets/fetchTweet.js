export const FETCH_TWEET_TYPE = 'FETCH_TWEET';
export const fetchTweetA = (tweetId) => async (dispatch) => {
  const res = await fetch(`/api/get-tweet.php?tweetId=${tweetId}`);
  if (!res.ok) return console.log(await res.text());

  const tweet = await res.json();

  dispatch({
    type: FETCH_TWEET_TYPE,
    payload: tweet,
  });
};
