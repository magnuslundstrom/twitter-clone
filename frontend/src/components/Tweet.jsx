import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { likeTweetA } from '../store/actions/tweets/likeTweet';
import CommentFormModal from './CommentFormModal';
import { deleteTweetA } from '../store/actions/tweets/deleteTweet';
import ProfileImage from './utils/ProfileImage';

const Tweet = ({
  tweet: { name, body, createdAt, tweet_id, user_id, likedStatus, numLikes, numComments },
  likeTweetA,
  loggedInUser,
  deleteTweetA,
}) => {
  const [liked, setLiked] = useState(!likedStatus || likedStatus === '0' ? false : true);
  const [number, setNumber] = useState(numLikes || 0);
  const [displayComment, setDisplayComment] = useState(false);

  const onLikeHandler = () => {
    likeTweetA(tweet_id, liked);
    if (liked) setNumber(parseInt(number) - 1);
    else setNumber(parseInt(number) + 1);
    setLiked(!liked);
  };

  const onDeleteHandler = () => {
    deleteTweetA(tweet_id);
  };

  return (
    <div className="tweet-wrapper" data-tweetid={tweet_id}>
      {displayComment && (
        <div onClick={(e) => e.stopPropagation()}>
          <CommentFormModal
            setDisplay={setDisplayComment}
            body={body}
            name={name}
            createdAt={createdAt}
            tweetId={tweet_id}
            tweet_user_id={user_id}
          />
        </div>
      )}
      <div className="tweet">
        <ProfileImage user_id={user_id} classNames="tweet-profile-image" />
        <div style={{ width: '100%' }}>
          <div className="tweet-header">
            <Link to={`/profile/${user_id}`} data-userid={user_id} className="font-semibold">
              {name}
            </Link>
            <div style={{ display: 'flex' }}>
              <p className="">{dayjs(createdAt).format('MMM D')}</p>
              {loggedInUser === user_id && (
                <button style={{ color: 'rgb(101, 119, 134)', marginLeft: '10px' }} onClick={onDeleteHandler}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
            </div>
          </div>
          <p className="tweet-body">{body}</p>
          <div className="tweet-actions-bar">
            <div>
              <button className={`like-button ${liked ? 'tweet-liked' : ''}`} style={{ justifySelf: 'start' }} onClick={onLikeHandler}>
                <i className={`far fa-heart`}></i>
                <span className="">{number}</span>
              </button>
            </div>
            <div>
              <button className="comment-button" style={{ justifySelf: 'start' }} onClick={() => setDisplayComment(true)}>
                <i className="far fa-comment"></i>
                <span className="">{numComments}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    user: { user_id },
  },
}) => ({
  loggedInUser: user_id,
});

export default connect(mapStateToProps, { likeTweetA, deleteTweetA })(Tweet);
