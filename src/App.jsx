import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(post){
    const newMessage = {username: post.username, content: post.content};
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = '';
  }

  // in App.jsx
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
