import React from 'react';

class ChatSocket extends React.Component {
  constructor(convId) {
    // this.convId = convId;
    this.ws = new WebSocket(`ws://localhost:3001?convId=${convId}`);
  }

  bind(appendMessage) {
    this.ws.onopen = (event) => {
      this.ws.addEventListener('message', (event) => {
        appendMessage(JSON.parse(event.data));
      });
    };
  }

  sendMessage = (state) => {
    this.ws.send(JSON.stringify(state));
  };

  unbind() {
    this.ws.close();
  }
}

export default ChatSocket;
