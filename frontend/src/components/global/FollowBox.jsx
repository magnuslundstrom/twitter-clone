import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { stringCutter } from '../../helpers/stringCutter';
import { followUserA } from '../../store/actions/profile/followUser';
import ProfileImage from '../utils/ProfileImage';

const FollowModal = connect(null, { followUserA })(({ name, user_id, displayHandler, followUserA }) => {
  const unfollowHandler = () => {
    followUserA(user_id);
    displayHandler(false);
  };

  return ReactDOM.createPortal(
    <div className="unfollow-modal" onClick={() => displayHandler(false)}>
      <div className="unfollow-modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <h3>Unfollow {name}?</h3>
        <p>
          Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.
        </p>
        <div>
          <button onClick={() => displayHandler(false)}>Cancel</button>
          <button onClick={unfollowHandler}>Unfollow</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
});

const FollowBox = ({ user: { name, followStatus, image, user_id }, followUserA }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const followMessage = followStatus ? 'Unfollow' : 'Follow';

  const onFollowHandler = () => {
    if (followStatus) {
      setDisplayModal(true);
      return;
    } else {
      followUserA(user_id);
    }
  };

  return (
    <div className="follow-box">
      {displayModal && <FollowModal name={name} user_id={user_id} displayHandler={setDisplayModal} />}
      <div style={{ height: '50px', width: '50px', marginRight: '10px' }}>
        <ProfileImage user_id={user_id} />
      </div>
      <div>
        <Link to={`/profile/${user_id}`}>{stringCutter(name, 12)}</Link>
        <p className="follow-box-user-name">@{stringCutter('squareengi391', 12)}</p>
      </div>
      <button onClick={onFollowHandler}>{followMessage}</button>
    </div>
  );
};

export default connect(null, { followUserA })(FollowBox);
