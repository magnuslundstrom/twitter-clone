import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/global/Nav';
import ChatList from '../components/chat/ChatList';
import Chat from '../components/chat/Chat';
import { selectChatA } from '../store/actions/chat/selectChat';
import { appendUserA } from '../store/actions/chat/appendUser';

class Messages extends React.Component {
  componentDidMount() {
    this.props.selectChatA(this.props.match.params.conversationId);
  }
  componentDidUpdate() {
    this.props.selectChatA(this.props.match.params.conversationId);
  }

  render() {
    return (
      <div style={{ gridTemplateColumns: '220px 350px 2fr', display: 'grid' }} className="container chat-page">
        <Nav />
        <div className="messages">
          <div className="messages-header">
            <h1>Messages</h1>
            <button>
              <i className="far fa-envelope"></i>
            </button>
          </div>
          <div className="messages-search">
            <div>
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Does not work"></input>
            </div>
          </div>
          <div className="messages-chat">
            <ChatList />
          </div>
        </div>
        <div className="right">
          <Chat
            newChatName={this.props.location.state ? this.props.location.state.userName : ''}
            newChatUserId={this.props.location.state ? this.props.location.state.user_id : ''}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedConvId: state.chatList.selectedConvId,
});

export default connect(mapStateToProps, { selectChatA, appendUserA })(Messages);
