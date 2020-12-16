import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const MessagesList = ({ messages, loggedInUserId }) => {
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessages = () => {
    return messages.map((message) => <Message message={message} self={message.user_id === loggedInUserId} key={message.message_id} />);
  };
  return (
    <>
      <div id="testink">{renderMessages()}</div>
      <div ref={listRef}></div>
    </>
  );
};

const mapStateToProps = ({ chatRoom: { messages } }) => {
  return {
    messages,
  };
};

export default connect(mapStateToProps)(MessagesList);
