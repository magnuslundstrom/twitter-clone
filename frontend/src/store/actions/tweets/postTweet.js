export const POST_TWEET_TYPE = 'POST_TWEET';

export const postTweetA = (body) => async (dispatch, getState) => {
  console.log(body);

  const formData = new FormData();
  formData.append('tweetBody', body);
  const response = await fetch('/api/post-tweet.php', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) return console.log(await response.text());
  const { id } = await response.json();

  const user_id = getState().auth.user.user_id;
  const fullName = getState().auth.user.fullName;

  dispatch({
    type: POST_TWEET_TYPE,
    payload: {
      tweet_id: id,
      createdAt: new Date(),
      likedStatus: 0,
      name: fullName,
      user_id,
      body,
      numLikes: 0,
      numComments: 0,
    },
  });
};

/*
    Components using this:
    None atm

*/
