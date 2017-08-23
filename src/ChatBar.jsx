import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {
      content: "",
      username: "Anon"
    }
  };

  getUser = (event) => {
    this.setState({username: event.target.value});
  }

  handleInput = (event) => {
    if (event.key === "Enter"){
      this.setState({content: event.target.value}, function() {
        this.props.onNewPost(this.state);
      });
    }
  }

  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyUp={this.getUser} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleInput} />
      </footer>
    )
  }
}

export default ChatBar
