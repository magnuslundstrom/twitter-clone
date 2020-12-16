import React from 'react';
import { store } from './index';

class MegaSocket {
  constructor(userId) {
    this.ws = new WebSocket(`ws://localhost:3001?userId=${userId}`);

    this.ws.onopen = (event) => {
      console.log('SOCKET CONNECTED');
      this.ws.addEventListener('message', (event) => {
        ///// MOST CONTAIN A TYPE PROPERTY
        switch (event.data.type) {
          default:
            console.log(event.data);
        }
      });
    };
  }

  sendMessage(messageObj) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(messageObj));
    }
  }
}

export default MegaSocket;
