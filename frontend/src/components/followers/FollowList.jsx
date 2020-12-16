import React from 'react';
import UserBox from './UserBox';

const FollowList = ({ list }) => {
  const renderUsers = list.map((item) => <UserBox item={item} key={item.user_id} />);
  return <div>{renderUsers}</div>;
};

export default FollowList;
