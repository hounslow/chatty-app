import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(post){
    const newMessage = {username: post.username, content: post.content};
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = '';
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.addEventListener('message', (event) => {
      const messageObject = JSON.parse(event.data);
      const messages = this.state.messages.concat(messageObject);
      this.setState({messages: messages});
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <div>
          <div>
            <MessageList messages={this.state.messages}/>
          </div>
          <div>
            <ChatBar currentUser={this.state.currentUser} onNewPost={this.onNewPost} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
