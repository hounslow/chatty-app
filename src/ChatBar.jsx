import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {
      content: "",
      username: "Bob"
    }
  };

  getUser = (event) => {
    const username = event.target.value ? event.target.value : 'Anonymous';
    this.props.updateUser(username);
  }

  handleInput = (event) => {
    if (event.key === "Enter"){
        this.props.onNewPost(event.target.value);
        event.target.value = '';
      }
    };

  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onBlur={this.getUser} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleInput} />
      </footer>
    );
  }
}

export default ChatBar
