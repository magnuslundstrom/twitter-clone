import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../utils/ProfileImage';
import dayjs from 'dayjs';
const Message = ({ message: { message_id, body, user_id, created_at }, self }) => {
  return (
    <div className={`message ${self ? 'self' : ''}`} id={message_id}>
      {!self && (
        <Link to={`/profile/${user_id}`}>
          <ProfileImage user_id={user_id} />
        </Link>
      )}
      <div className="message-right">
        <p className="message-right-text">{body}</p>
        <p className="message-sent">{dayjs(created_at).format('MMM D h:mm A')}</p>
      </div>
    </div>
  );
};

export default Message;
