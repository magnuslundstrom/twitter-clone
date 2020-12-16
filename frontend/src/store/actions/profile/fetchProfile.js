export const FETCH_PROFILE_DATA_TYPE = 'FETCH_PROFILE_DATA';
export const fetchProfileDataA = (id) => async (dispatch) => {
  const profileResponse = await fetch(`/api/get-profile-data.php?userId=${id}`);
  if (!profileResponse.ok) return console.log(await profileResponse.text());
  const profile = await profileResponse.json();
  dispatch({
    type: FETCH_PROFILE_DATA_TYPE,
    payload: profile,
  });
};

/*
    Components using this:
    Profile.jsx on mount using data to show as a profile
*/

export const FETCH_PROFILE_TWEETS_TYPE = 'FETCH_PROFILE_TWEETS';
export const fetchProfileTweetsA = (id, skip) => async (dispatch) => {
  const tweetsResponse = await fetch(`/api/get-profile-tweets.php?userId=${id}&skip=${skip}`);
  if (!tweetsResponse.ok) return console.log(await tweetsResponse.text());
  const tweets = await tweetsResponse.json();
  dispatch({
    type: FETCH_PROFILE_TWEETS_TYPE,
    payload: tweets,
  });
};

/*
    Components using this:
    Profile.jsx on mount passing data to a TweetList
*/
