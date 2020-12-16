import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecentSearchesA } from '../../../store/actions/search/fetchRecentSearches';
import { userSearchHandler } from '../../../store/actions/search/fetchUserSearch';
import { addRecentSearchA } from '../../../store/actions/search/addRecentSearch';
import ProfileImage from '../../utils/ProfileImage';

const SearchBox = ({ displayHandler, recent, fetchRecentSearchesA, current, searchTerm, userSearchHandler, addRecentSearchA }) => {
  useEffect(() => {
    if (recent.length === 0) {
      fetchRecentSearchesA();
    }
    const handleDropDown = (e) => {
      if (e.target.getAttribute('data-click')) return;
      const parent = document.querySelector('.search-bar');
      if (!parent.contains(e.target)) displayHandler(false);
    };
    document.addEventListener('click', handleDropDown);

    return () => {
      document.removeEventListener('click', handleDropDown);
    };
  }, [displayHandler]);

  const arrToMap = searchTerm.length > 0 ? current : recent;

  const linkClickHandler = (search_term) => {
    addRecentSearchA(search_term);
  };

  const renderSearches = arrToMap.map(({ search_term, name, user_id = 'false' }, index) => {
    if (arrToMap === current) {
      return (
        <div className="profile-search-wrapper" key={index}>
          <ProfileImage user_id={user_id} />
          <Link to={`/profile/${user_id}`} onClick={() => linkClickHandler(name)} data-click>
            {search_term || name}
          </Link>
        </div>
      );
    } else
      return (
        <button data-click key={index} onClick={() => userSearchHandler(search_term)}>
          {search_term}
        </button>
      );
  });

  return (
    <div className="search-box">
      {(recent.length === 0 && searchTerm.length === 0 && <p>Try searching for people</p>) || (
        <div>
          {searchTerm.length === 0 && <h3 className="recent-searches-title">Recent</h3>}
          <div>{renderSearches.length === 0 && searchTerm.length > 0 ? <p>No matches</p> : renderSearches}</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ searches: { recent, current, searchTerm } }) => ({
  recent,
  current,
  searchTerm,
});

export default connect(mapStateToProps, { fetchRecentSearchesA, userSearchHandler, addRecentSearchA })(SearchBox);
