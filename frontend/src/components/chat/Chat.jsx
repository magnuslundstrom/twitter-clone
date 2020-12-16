import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChatRoomA } from '../../store/actions/chat/fetchChatRoom';
import { clearChatRoomA } from '../../store/actions/chat/clearChatRoom';
import { sendMessageA } from '../../store/actions/chat/sendMessage';
import { createConversationA } from '../../store/actions/chat/createConversation';
import { pushMessageA } from '../../store/actions/chat/pushMessage';
import MessagesList from './MessagesList';
import ChatSearch from './ChatSearch';

const Chat = ({
  fetchChatRoomA,
  chatRoom,
  clearChatRoomA,
  selectedConvId,
  loggedInUserId,
  sendMessageA,
  newChatName,
  createConversationA,
  pushMessageA,
}) => {
  const chatRoomRef = useRef(null);
  const [body, setBody] = useState('');
  const params = useParams();
  const ws = useRef();

  useEffect(() => {
    if (chatRoom.validated) {
      ws.current = new WebSocket(`ws://localhost:3001?convId=${chatRoom.validated}`);
      ws.current.onopen = function (ev) {
        ws.current.addEventListener('message', (event) => {
          pushMessageA(JSON.parse(event.data));
        });
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [chatRoom.validated]);

  useEffect(() => {
    fetchChatRoomA();

    return () => {
      clearChatRoomA();
    };
  }, [selectedConvId]);

  const onSubmitHandler = async () => {
    if (!chatRoom.validated) {
      await createConversationA(selectedConvId.split('-')[1], newChatName);
    }
    const id = await sendMessageA(body);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          body,
          user_id: loggedInUserId,
          created_at: new Date(),
          message_id: id,
        })
      );
    }
    setBody('');
  };

  const renderUsers = () => {
    if (chatRoom.users.length > 0) {
      return chatRoom.users.map((user) => user.name).join(', ');
    } else if (newChatName) {
      return newChatName;
    } else if (!params.hasOwnProperty('conversationId')) {
      return 'No selected chat';
    } else {
      return 'Unknown';
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h3>{renderUsers()}</h3>
        <ChatSearch convId={chatRoom.validated} />
      </div>
      <div className="chat-room" ref={chatRoomRef}>
        <MessagesList loggedInUserId={loggedInUserId} />
      </div>
      <div className="chat-form">
        <input type="text" placeholder="Type a message" value={body} onChange={(e) => setBody(e.target.value)}></input>
        <button className="chat-form-button" onClick={onSubmitHandler}>
          Send!
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ chatList, chatRoom, auth }) => ({
  loggedInUserId: auth.user.user_id,
  selectedConvId: chatList.selectedConvId,
  chatRoom,
});

export default connect(mapStateToProps, { fetchChatRoomA, clearChatRoomA, sendMessageA, createConversationA, pushMessageA })(Chat);

// const onSubmitHandler = () => {
//   const obj = {
//     message_id: '',
//     body: '',
//     sender_fk: '',
//     receiver_fk: '',
//     conversation_fk: '',
//     user_id: '',
//     fullName: '',
//     sentAt: '',
//   };
// };
