export const LIKE_TWEET_TYPE = 'LIKE_TWEET';
export const likeTweetA = (tweetId, currentStatus) => async (dispatch) => {
  const formData = new FormData();
  formData.append('tweetId', tweetId);
  const response = await fetch('/api/like-tweet.php', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) return console.log(await response.text());
  dispatch({
    type: LIKE_TWEET_TYPE,
    payload: { tweetId, currentStatus },
  });
};

/*
    Components using this:
    Tweet.jsx on like click

*/
