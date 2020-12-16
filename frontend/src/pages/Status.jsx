import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Nav from '../components/global/Nav';
import Tweet from '../components/Tweet';
import Comment from '../components/Comment';
import { fetchTweetA } from '../store/actions/tweets/fetchTweet';
import { notEmptyObjChecker } from '../helpers/notEmptyObjChecker';
import BackButton from '../components/global/BackButton';

const Status = ({ status, fetchTweetA }) => {
  const params = useParams();

  useEffect(() => {
    fetchTweetA(params.tweetId);
  }, []);

  let comments = [];
  if (status.hasOwnProperty('comments')) {
    comments = status.comments.map((comment) => <Comment comment={comment} key={comment.comment_id} />);
  }

  return (
    <div style={{ gridTemplateColumns: '220px 600px 1fr', display: 'grid' }} className="container status">
      <Nav />
      <div>
        <div className="mid-top">
          <BackButton />
          <h1>Tweet</h1>
        </div>
        <div>
          {(notEmptyObjChecker(status) && (
            <>
              <Tweet tweet={status} />
              {comments}
            </>
          )) || <p>Loading tweet...</p>}
        </div>
      </div>
      <div className="right">
        <p>Hej</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ status }) => ({
  status,
});

export default connect(mapStateToProps, { fetchTweetA })(Status);
