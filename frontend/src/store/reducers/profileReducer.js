import { FETCH_PROFILE_DATA_TYPE, FETCH_PROFILE_TWEETS_TYPE } from '../actions/profile/fetchProfile';
import { FOLLOW_USER_TYPE } from '../actions/profile/followUser';
import { CLEAR_PROFILE_TYPE } from '../actions/profile/clearProfile';
import { LIKE_TWEET_TYPE } from '../actions/tweets/likeTweet';
import { COMMENT_TWEET_TYPE } from '../actions/tweets/commentTweet';
import { DELETE_TWEET_TYPE } from '../actions/tweets/deleteTweet';
import { EDIT_PROFILE_TYPE } from '../actions/profile/editProfile';

const initState = {
  details: {},
  tweets: [],
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_DATA_TYPE:
      return { ...state, details: { ...action.payload } };
    case FETCH_PROFILE_TWEETS_TYPE:
      return { ...state, tweets: [...state.tweets, ...action.payload] };
    case LIKE_TWEET_TYPE:
      if (state.tweets) {
        const tweets = state.tweets;
        const tweetIdx = tweets.findIndex((tweet) => tweet.tweet_id === action.payload.tweetId);
        if (tweetIdx >= 0) {
          tweets[tweetIdx].likedStatus = !action.payload.currentStatus;
          if (!action.payload.currentStatus) {
            tweets[tweetIdx].numLikes++;
          } else tweets[tweetIdx].numLikes--;
        }
      }
      return { ...state };
    case FOLLOW_USER_TYPE:
      if (state.details.hasOwnProperty('followStatus')) {
        const curStatus = !state.details.followStatus || state.details.followStatus === '0' ? false : true;
        state.details.followStatus = !curStatus;
        return { ...state };
      } else return state;

    case COMMENT_TWEET_TYPE: {
      const newState = { ...state };
      const tweet = newState.tweets.find((tweet) => tweet.tweet_id === action.payload.tweetId);
      if (tweet) {
        const tweets = [...newState.tweets];
        tweet.numComments++;
        return { ...newState, tweets: [...tweets] };
      }
      return state;
    }

    case EDIT_PROFILE_TYPE: {
      const newState = { ...state };
      newState.details.name = action.payload.firstName + ' ' + action.payload.lastName;
      newState.details.description = action.payload.description;
      return newState;
    }

    case DELETE_TWEET_TYPE: {
      if (state.tweets.length > 0) {
        const idx = state.tweets.findIndex((tweet) => tweet.tweet_id === action.payload);
        if (idx === -1) return state;
        const newTweets = [...state.tweets];
        newTweets.splice(idx, 1);
        return { details: { ...state.details, tweetCount: state.details.tweetCount - 1 }, tweets: [...newTweets] };
      }
      return state;
    }

    case CLEAR_PROFILE_TYPE:
      return initState;

    default:
      return state;
  }
};

/*
    Components using this:
    Profile.jsx fetching the profileData and the tweets to show on a list

*/

export default profileReducer;
