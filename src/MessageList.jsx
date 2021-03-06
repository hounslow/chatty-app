import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages.map(message => {
      return <Message
        key={ message.key }
        currentUser={ message.currentUser }
        content={ message.content }
        />
    });

    return (
      <main className="messages">
          { messages }
      </main>
    );
  }
}

export default MessageList;
