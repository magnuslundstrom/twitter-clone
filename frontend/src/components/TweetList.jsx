import React, { useEffect, useState } from 'react';
import TweetWrap from './TweetWrap';

const TweetsList = ({ tweets }) => {
  const [tweetState, setTweetState] = useState(tweets);

  const renderTweets = tweetState.map((tweet) => {
    return <TweetWrap tweet={tweet} key={`${tweet.tweet_id}${tweet.numComments}`} link={`/status/${tweet.user_id}/${tweet.tweet_id}/`} />;
  });

  useEffect(() => {
    setTweetState(tweets);
  }, [tweets]);

  return (
    <div className="tweetList">
      {(tweets.length === 0 && (
        <p className="no-tweets-message">No tweets found - Try following some people or refresh your browser!</p>
      )) || <div>{renderTweets}</div>}{' '}
    </div>
  );
};

export default TweetsList;
