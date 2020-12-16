import React from 'react';

const ProfileImage = ({ user_id, classNames }) => {
  return (
    <img
      style={{ objectFit: 'cover' }}
      className={classNames}
      src={`/images/profile-images/profile-image-${user_id}.jpg`}
      alt="profile"
      onError={function (e) {
        e.target.src = 'https://source.unsplash.com/random/400x400';
      }}
    />
  );
};

export default ProfileImage;
