import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import Nav from '../components/global/Nav';
import SearchBar from '../components/global/search/SearchBar';
import FollowSuggestionList from '../components/global/FollowSuggestions';
import { followUserA } from '../store/actions/profile/followUser';
import { fetchProfileDataA, fetchProfileTweetsA } from '../store/actions/profile/fetchProfile';
import { clearProfileA } from '../store/actions/profile/clearProfile';
import TweetList from '../components/TweetList';
import ProfileImage from '../components/utils/ProfileImage';
import EditProfileModal from '../components/EditProfileModal';
import WithObserverListRedux from '../components/global/withObserverListRedux';
import BackButton from '../components/global/BackButton';

const Profile = ({ followUserA, fetchProfileDataA, fetchProfileTweetsA, details, tweets, clearProfileA, followStatus, loggedInUserId }) => {
  const { userId } = useParams();
  const history = useHistory();
  const [displayEdit, setDisplayEdit] = useState(false);
  useEffect(() => {
    fetchProfileDataA(userId);
    fetchProfileTweetsA(userId);
    return () => clearProfileA();
  }, [fetchProfileDataA, fetchProfileTweetsA, clearProfileA, userId]);

  const onUploadProfileImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await fetch('/api/upload-profile-image.php', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) return console.log('image wasnt uploaded');
    else history.go(0);
  };

  const onScrollHandler = (userId, skip) => {
    fetchProfileTweetsA(userId, skip);
  };
  const renderContent = () => {
    if (!details.hasOwnProperty('user_id')) return <p>Loading!</p>;
    else {
      const { user_id, name, createdAt, followingCount, followerCount, tweetCount, coverImage, description } = details;
      return (
        <div>
          {displayEdit && <EditProfileModal displayHandler={setDisplayEdit} description={description} />}
          {/* Header */}
          <div className="profile-header">
            <BackButton />
            <div>
              <h1>{name}</h1>
              <p>{tweetCount} Tweets</p>
            </div>
          </div>
          {/* Header end */}
          <div id={user_id} className="">
            <div className="profile-cover-image">
              {userId === loggedInUserId && (
                <form className="upload-profile-image-form">
                  <label htmlFor="photo">
                    <i className="fas fa-camera"></i>
                  </label>
                  <input type="file" name="photo" id="photo" onChange={(e) => onUploadProfileImage(e)} />
                </form>
              )}
              <ProfileImage user_id={user_id} classNames="profile-cover-image-image" />
            </div>
            <div className="profile-details">
              <div className="profile-details-lower">
                <div className="profile-details-lower-left">
                  <h3>{name}</h3>
                  <p>@{name}</p>
                  <p className="profile-details-lower-left-calender">
                    <i className="far fa-calendar-alt"></i>
                    Joined {createdAt}
                  </p>
                  <div className="profile-details-lower-left-follow-count">
                    <Link to={`/${user_id}/following`}>
                      <span className="number">{followingCount}</span> Following
                    </Link>
                    <Link to={`/${user_id}/followers`}>
                      <span className="number">{followerCount}</span> Followers
                    </Link>
                  </div>
                  <p style={{ marginTop: '10px' }}>{description}</p>
                </div>
                <div className="profile-details-lower-actions">
                  {(loggedInUserId === user_id && <button onClick={() => setDisplayEdit(true)}>Edit</button>) || (
                    <>
                      <Link to={{ pathname: `/messages/${loggedInUserId}-${user_id}`, state: { userName: name } }} className="block">
                        <i className="far fa-envelope"></i>
                      </Link>
                      <button onClick={() => followUserA(user_id)}>{!followStatus || followStatus === '0' ? 'Follow' : 'Unfollow'}</button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <Link to="">Tweets</Link>
              <Link to="">Tweets & replies</Link>
              <Link to="">Media</Link>
              <Link to="">Likes</Link>
            </div>
          </div>

          <WithObserverListRedux cb={onScrollHandler.bind(this, user_id)}>
            <TweetList tweets={tweets} />
          </WithObserverListRedux>
        </div>
      );
    }
  };

  return (
    <div style={{ gridTemplateColumns: '220px 600px 1fr', display: 'grid' }} className="container profile">
      <Nav />
      <div>{renderContent()}</div>
      <div className="right">
        <SearchBar />
        <FollowSuggestionList />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  profile: { details, tweets },
  auth: {
    user: { user_id },
  },
}) => ({
  details,
  tweets,
  followStatus: details.followStatus,
  loggedInUserId: user_id,
});

export default connect(mapStateToProps, { followUserA, fetchProfileDataA, fetchProfileTweetsA, clearProfileA })(Profile);
