import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/global/Nav';

import FollowSuggestionList from '../components/global/FollowSuggestions';
import SearchBar from '../components/global/search/SearchBar';
import { postTweetA } from '../store/actions/tweets/postTweet';
import { fetchHomeTweetsA } from '../store/actions/tweets/fetchHomeTweets';
import FollowList from '../components/followers/FollowList';
import WithObserverListApi from '../components/global/withObserverListApi';
import BackButton from '../components/global/BackButton';

const Home = () => {
  const params = useParams();
  const [userName, setUserName] = useState('Loading');
  const [urlParams, setUrlParams] = useState(params.followRelation);

  useEffect(() => {
    fetch(`/api/get-user-name.php?userId=${params.userId}`).then((data) => {
      data.json().then(({ name }) => setUserName(name));
    });
  }, [params.userId, params.followRelation]);

  useEffect(() => {
    setUrlParams(params.followRelation);
  }, [params.followRelation]);

  return (
    <div style={{ gridTemplateColumns: '220px 600px 1fr', display: 'grid' }} className="container">
      <Nav />
      <div className="followers-list">
        <div className="followers-list-top">
          <div className="followers-list-top-head">
            <BackButton />
            <h1>{userName}</h1>
          </div>

          <div className="followers-list-relations">
            <Link to={`/${params.userId}/following`} className={params.followRelation === 'following' ? 'active' : ''}>
              Following
            </Link>
            <Link to={`/${params.userId}/followers`} className={params.followRelation === 'followers' ? 'active' : ''}>
              Followers
            </Link>
          </div>
        </div>
        {urlParams === 'following' && (
          <WithObserverListApi
            api={`/api/get-${params.followRelation}.php?userId=${params.userId}`}
            render={(list) => <FollowList list={list} />}
          />
        )}
        {urlParams === 'followers' && (
          <WithObserverListApi
            api={`/api/get-${params.followRelation}.php?userId=${params.userId}`}
            render={(list) => <FollowList list={list} />}
          />
        )}
      </div>

      <div className="right">
        <SearchBar />
        <FollowSuggestionList />
      </div>
    </div>
  );
};

const mapStateToProps = ({ homeTweets }) => ({
  homeTweets,
});

export default connect(mapStateToProps, { fetchHomeTweetsA, postTweetA })(Home);
