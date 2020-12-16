import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchMessagesA } from '../../store/actions/chat/searchMessage';
import usePrevious from '../hooks/usePrevious';
import { fetchChatMessagesOnlyA } from '../../store/actions/chat/fetchChatRoom';

const ChatSearch = ({ convId, messageList, searchMessagesA, fetchChatMessagesOnlyA }) => {
  const [search, setSearch] = useState('');
  const prevSearch = usePrevious(search, '');
  const handleChange = (e) => {
    if (!convId || convId === '0') return;
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (search.length > 0) {
        searchMessagesA(search, convId);
      } else if (search.length === 0 && prevSearch.length === 1) {
        fetchChatMessagesOnlyA();
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  return (
    <div>
      <input type="text" placeholder="Search messages" value={search} onChange={handleChange}></input>
    </div>
  );
};

const mapStateToProps = ({ chatRoom }) => {
  return {
    messageList: chatRoom.messages,
  };
};

export default connect(mapStateToProps, { searchMessagesA, fetchChatMessagesOnlyA })(ChatSearch);
