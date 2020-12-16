import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../utils/ProfileImage';

const UserBox = ({ item: { user_id, name, description, follow_status } }) => {
  const [status, setStatus] = useState(parseInt(follow_status));

  const onFollowHandler = async () => {
    const form = new FormData();
    form.append('userToFollowId', user_id);
    const res = await fetch(`/api/follow-user.php`, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) return console.log(await res.text());
    setStatus(!status);
  };

  return (
    <div className="followers-list-user-box">
      <ProfileImage user_id={user_id} classNames="profile-img" />
      <div className="followers-list-user-box-right">
        <div>
          <Link to={`/profile/${user_id}`}>{name}</Link>
          {description && <p>{description}</p>}
        </div>
        <button onClick={onFollowHandler} className={status ? 'following' : 'follow'}>
          {status ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default UserBox;
