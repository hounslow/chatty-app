import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: "Bob",
      messages: []
    };
    this.onNewPost = this.onNewPost.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  onNewPost(content){
    const newMessage = {type: 'postMessage', username: this.state.currentUser, content: content};
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001', 'protocolOne');
    this.socket.onmessage = (event) => {
      const messageObject = JSON.parse(event.data);

      if (messageObject.type === 'count'){
        this.setState({userCount: messageObject.userCount});
      } else {
        const messages = this.state.messages.concat(messageObject);
        this.setState({messages: messages});
      }
     }
   }

  updateUser(username) {
    if (this.state.currentUser !== username){
      const relay = {type: 'postUpdate', pastUser: this.state.currentUser, newUser: username};
      this.socket.send(JSON.stringify(relay));
      this.setState({currentUser: username});
    }
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <div>
          <div>
            <MessageList messages={this.state.messages}/>
          </div>
          <div>
            <ChatBar currentUser={this.state.currentUser} onNewPost={this.onNewPost} updateUser={this.updateUser}/>
          </div>
      </div>
    </div>
    );
  }
}
export default App;
