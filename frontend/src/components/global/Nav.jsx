import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImage from '../utils/ProfileImage';
import { logoutA } from '../../store/actions/auth/login';

const Nav = ({ user_id, name, logoutA }) => {
  return (
    <div id="nav-wrapper">
      <div id="nav">
        <div id="nav-menu">
          <div>
            <Link to="/home">
              <i className="fas fa-home"></i>Home
            </Link>

            <Link to={`/profile/${user_id}`}>
              <i className="fas fa-user-alt"></i>Profile
            </Link>
            <Link to={`/notifications`}>
              <i className="fas fa-bell"></i>
              Notifications
            </Link>
            <Link to={`/messages`}>
              <i className="far fa-envelope"></i>
              Messages
            </Link>
            <button id="nav-tweetBtn">Tweet</button>
          </div>
          <div id="nav-options">
            <button onClick={logoutA}>
              <div className="first-container">
                <ProfileImage user_id={user_id} />
              </div>
              <div style={{ fontSize: '10px' }}>{name}</div>
              <i className="fas fa-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    user: { user_id, name },
  },
}) => ({
  user_id,
  name,
});

export default connect(mapStateToProps, { logoutA })(Nav);
