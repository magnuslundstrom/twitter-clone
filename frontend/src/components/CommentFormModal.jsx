import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { commentTweetA } from '../store/actions/tweets/commentTweet';
import ProfileImage from './utils/ProfileImage';

const CommentFormModal = ({ setDisplay, createdAt, body, name, commentTweetA, user_id, fullName, tweetId, tweet_user_id }) => {
  const [comment, setComment] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      user_id,
      name: fullName,
      tweetId,
      commentBody: comment,
    };

    commentTweetA(data);
    setDisplay(false);
  };

  return ReactDOM.createPortal(
    <div className="comment-modal" onClick={() => setDisplay(false)}>
      <div onClick={(e) => e.stopPropagation()} className="comment-modal-box">
        <header>
          <button onClick={() => setDisplay(false)}>
            <i className="fas fa-times"></i>
          </button>
        </header>
        <div className="tweet">
          <ProfileImage user_id={tweet_user_id} classNames={'tweet-profile-image'} />
          <div style={{ width: '100%' }}>
            <div className="tweet-header">
              <p className="font-semibold">{name}</p>
              <p className="">{dayjs(createdAt).format('MMM D')}</p>
            </div>
            <p className="tweet-body">{body}</p>
            <p className="comment-modal-replying">Replying to @{name}</p>
          </div>
        </div>
        <div className="comment-modal-form">
          <div>
            <ProfileImage user_id={user_id} classNames={'tweet-profile-image'} />
          </div>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <input
              type="text"
              placeholder="Tweet your reply!"
              name="commentBody"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></input>
            <button>Reply</button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

const mapStateToProps = ({
  auth: {
    user: { user_id, fullName },
  },
}) => ({
  user_id,
  fullName,
});

export default connect(mapStateToProps, { commentTweetA })(CommentFormModal);
