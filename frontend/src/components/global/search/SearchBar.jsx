import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import { fetchUserSearchA, userSearchHandler } from '../../../store/actions/search/fetchUserSearch';

const SearchBar = ({ fetchUserSearchA, searchTerm, userSearchHandler }) => {
  const [displayBox, setDisplayBox] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const cancelSearch = setTimeout(() => {
        fetchUserSearchA(searchTerm);
      }, 300);

      return () => {
        clearTimeout(cancelSearch);
      };
    }
  }, [searchTerm, fetchUserSearchA]);

  return (
    <div className="search-bar" onClick={() => setDisplayBox(true)}>
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Search users" value={searchTerm} onChange={(e) => userSearchHandler(e.target.value)} />
      {displayBox && <SearchBox displayHandler={setDisplayBox} />}
    </div>
  );
};

const mapStateToProps = ({ searches: { searchTerm } }) => ({
  searchTerm,
});
export default connect(mapStateToProps, { fetchUserSearchA, userSearchHandler })(SearchBar);
