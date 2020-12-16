import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFollowSuggestionsA } from '../../store/actions/fetchFollowSuggestions';

import FollowBox from '../global/FollowBox';
const FollowSuggestion = ({ followSuggestions, fetchFollowSuggestionsA }) => {
  const followBoxes = followSuggestions.map((user, index) => <FollowBox user={user} key={`${index}${user.followStatus}`} />);

  useEffect(() => {
    if (followSuggestions.length === 0) fetchFollowSuggestionsA();
  }, [fetchFollowSuggestionsA]);

  return (
    <div className="right-list">
      <h3>Who to follow</h3>
      <div>{followBoxes}</div>
    </div>
  );
};

const mapStateToProps = ({ followSuggestions }) => ({
  followSuggestions,
});

export default connect(mapStateToProps, { fetchFollowSuggestionsA })(FollowSuggestion);
