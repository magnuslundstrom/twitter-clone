import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/global/Nav';
import TweetList from '../components/TweetList';
import FollowSuggestionList from '../components/global/FollowSuggestions';
import SearchBar from '../components/global/search/SearchBar';
import { postTweetA } from '../store/actions/tweets/postTweet';
import ProfileImage from '../components/utils/ProfileImage';
import { fetchHomeTweetsA } from '../store/actions/tweets/fetchHomeTweets';
import WithObserverList from '../components/global/withObserverListRedux';

const Home = ({ fetchHomeTweetsA, homeTweets, homeBottom, postTweetA, user_id }) => {
  const [inputState, setInputState] = useState('');
  const bottomRef = useRef(null);

  const onChangeHandler = (val) => {
    setInputState(val);
  };

  useEffect(() => {
    fetchHomeTweetsA();
  }, [fetchHomeTweetsA]);

  useEffect(() => {
    let options = {
      rootMargin: '100px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onScrollHandler();
        }
      });
    }, options);
    if (homeTweets.length >= 10 && !homeBottom) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (homeTweets.length >= 10 && !homeBottom && bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [homeTweets]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postTweetA(inputState);
  };

  const onScrollHandler = (s) => {
    fetchHomeTweetsA(s);
  };

  return (
    <div style={{ gridTemplateColumns: '220px 600px 1fr', display: 'grid' }} className="container">
      <Nav />
      <div>
        <div className="mid-top">
          <h1>Home</h1>
        </div>
        <div id="tweet-home">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="input-image-wrapper">
              <ProfileImage user_id={user_id} />
              <div className="input-wrapper">
                <div className="input-content">
                  <input type="text" placeholder="What's happening?" onChange={(e) => onChangeHandler(e.target.value)}></input>
                </div>
                <p className="reply-status">
                  <i className="fas fa-globe-americas"></i> Everyone can reply
                </p>
              </div>
            </div>
            <div className="form-bottom">
              <button disabled={inputState < 1}>Tweet</button>
            </div>
          </form>
        </div>

        <TweetList tweets={homeTweets} />
        <div className="home-tweet-bottom" ref={bottomRef}></div>
      </div>
      <div className="right">
        <SearchBar />
        <FollowSuggestionList />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  homeTweets,
  auth: {
    user: { user_id },
  },
}) => ({
  homeTweets: homeTweets.tweets,
  homeSkip: homeTweets.skip,
  homeBottom: homeTweets.bottom,
  user_id,
});

export default connect(mapStateToProps, { fetchHomeTweetsA, postTweetA })(Home);
