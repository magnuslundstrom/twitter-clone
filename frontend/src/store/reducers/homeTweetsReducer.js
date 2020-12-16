import { FETCH_HOME_TWEETS_TYPE } from '../actions/tweets/fetchHomeTweets';
import { POST_TWEET_TYPE } from '../actions/tweets/postTweet';
import { LIKE_TWEET_TYPE } from '../actions/tweets/likeTweet';
import { COMMENT_TWEET_TYPE } from '../actions/tweets/commentTweet';
import { DELETE_TWEET_TYPE } from '../actions/tweets/deleteTweet';

const initState = {
  skip: 0,
  bottom: false,
  tweets: [],
};

const homeTweetsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_HOME_TWEETS_TYPE:
      const newState = { ...state };
      newState.tweets = [...newState.tweets, ...action.payload];
      newState.skip = newState.skip + action.payload.length;

      if (action.payload.length < 10) newState.bottom = true;
      return newState;

    case POST_TWEET_TYPE:
      return { ...state, tweets: [action.payload, ...state.tweets] };
    case LIKE_TWEET_TYPE:
      if (state.length > 0) {
        const tweetIdx = state.tweets.findIndex((tweet) => tweet.tweet_id === action.payload.tweetId);
        if (tweetIdx >= 0) {
          state.tweets[tweetIdx].likedStatus = !action.payload.currentStatus;
          if (!action.payload.currentStatus) {
            state.tweets[tweetIdx].numLikes++;
          } else state.tweets[tweetIdx].numLikes--;
        }
      }
      return { ...state };

    case COMMENT_TWEET_TYPE: {
      const newState = { ...state };
      const tweet = newState.tweets.find((tweet) => tweet.tweet_id === action.payload.tweetId);
      if (tweet) {
        tweet.numComments++;
        return newState;
      }
      return state;
    }

    case DELETE_TWEET_TYPE: {
      const idx = state.tweets.findIndex((tweet) => tweet.tweet_id === action.payload);
      if (idx === -1) return state;
      const newState = { ...state };
      newState.tweets.splice(idx, 1);
      return newState;
    }
    default:
      return state;
  }
};

/*
    Components making use of this:
    Home is grabbing homeTweets from redux store and rendering the tweets

*/

export default homeTweetsReducer;
