import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChatListA } from '../../store/actions/chat/fetchChatList';
import { clearChatListA } from '../../store/actions/chat/clearChatList';
import Userbox from './Userbox';

const ChatList = ({ chatList, fetchChatListA, clearChatListA, loggedInUserId }) => {
  const history = useHistory();
  useEffect(() => {
    fetchChatListA();
    return () => clearChatListA();
  }, [fetchChatListA, clearChatListA]);

  useEffect(() => {
    // if (chatList.chatList.length > 0 && chatList.selectedConvId === '0') {
    //   const chatType = chatList.chatList[0].type;
    //   if (chatType === 0) {
    //     history.push(`/messages/${loggedInUserId}-${chatList.chatList[0].users[0].user_id}`);
    //   } else {
    //     const messageUrl = chatType === '0' ? `${loggedInUserId}-${chatList.chatList[0].users[0].user_id}` : chatList[0].conversation_id;
    //     history.push(`/messages/${messageUrl}`);
    //   }
    // } else {
    //   // not quite sure what has to go on in here yet tbh
    // }
  }, [chatList.chatList, history]);

  const renderChatList = chatList.chatList.map((chat) => <Userbox chat={chat} key={chat.conversation_id} />);

  return (
    <div>
      <div>{renderChatList}</div>
    </div>
  );
};

const mapStateToProps = ({
  chatList,
  auth: {
    user: { user_id },
  },
}) => ({
  chatList,
  loggedInUserId: user_id,
});

export default connect(mapStateToProps, { fetchChatListA, clearChatListA })(ChatList);
