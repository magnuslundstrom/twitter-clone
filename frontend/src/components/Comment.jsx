import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { deleteCommentA } from '../store/actions/tweets/deleteComment';
import ProfileImage from './utils/ProfileImage';
const Comment = ({
  comment: { comment_id, commenter_id, body, createdAt, name, followerCount, followingCount },
  user_id,
  deleteCommentA,
}) => {
  const onDeleteHandler = () => {
    return deleteCommentA(comment_id);
  };

  return (
    <div id={comment_id} className="comment">
      <ProfileImage user_id={commenter_id} />
      <div className="comment-right">
        <div id={commenter_id}>
          <div>
            <p className="comment-profile-name">{name}</p>
            <p className="comment-date">{dayjs(createdAt).format('MMM D')}</p>
          </div>
          {commenter_id === user_id && (
            <button style={{ color: 'rgb(101, 119, 134)', marginLeft: '10px' }} onClick={onDeleteHandler}>
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    user: { user_id },
  },
}) => ({
  user_id,
});

export default connect(mapStateToProps, { deleteCommentA })(Comment);
