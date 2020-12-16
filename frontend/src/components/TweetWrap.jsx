import React from 'react';
import { useHistory } from 'react-router-dom';
import Tweet from './Tweet';

const TweetWrap = (props) => {
  const history = useHistory();
  const onClickHandler = (e) => {
    if (
      e.target instanceof HTMLAnchorElement ||
      e.target instanceof HTMLButtonElement ||
      e.target.parentNode instanceof HTMLButtonElement
    ) {
      return;
    } else {
      history.push(props.link);
    }
  };

  const tweet = () => {
    if (props.link) {
      return (
        <div onClick={(e) => onClickHandler(e)} style={{ cursor: 'pointer' }}>
          <Tweet {...props} />
        </div>
      );
    } else {
      return <Tweet {...props} />;
    }
  };

  return tweet();
};

export default TweetWrap;
