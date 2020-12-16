import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { createUrl } from './urlHelper';
import { Link } from 'react-router-dom';
import { stringCutter } from '../../helpers/stringCutter';
import { selectChatA } from '../../store/actions/chat/selectChat';
import ProfileImage from '../../components/utils/ProfileImage';

const Userbox = ({ chat: { conversation_id, body, message_sent, users, type }, loggedInUser, selectedConvId }) => {
  const memberString = stringCutter(users.map((user, index) => user.name).join(', '), 23, true);

  const cUrl = createUrl(loggedInUser, users, type) || conversation_id;

  return (
    <Link to={`/messages/${cUrl}`} className={`chatList-box ${cUrl === selectedConvId ? 'selected' : ''}`} id={conversation_id}>
      <div className="chatList-box-image-wrapper">
        <ProfileImage user_id={users[0].user_id} />
      </div>
      <div className="chatList-box-left">
        <div className="chatList-box-header">
          <p className="chatList-box-header-members">{memberString}</p>
          <p className="chatList-box-header-date">{message_sent && dayjs(message_sent).format('MMM D')}</p>
        </div>
        <p className="chatList-box-body">{(body && stringCutter(body, 23, true)) || ''}</p>
      </div>
    </Link>
  );
};

const mapStateToProps = ({
  auth: {
    user: { user_id },
  },
  chatList: { selectedConvId },
}) => ({
  loggedInUser: user_id,
  selectedConvId,
});

export default connect(mapStateToProps, { selectChatA })(Userbox);
