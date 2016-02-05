import React from 'react';
import AppStore from '../stores/app-store';
import Message from './message';

function getMessages() {
  return { messages: AppStore.getMessages() };
}

export default class MessageList extends React.Component {

  constructor() {
    super();
    this.state = getMessages();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  }
  
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log('did change');
    this.setState( getMessages );
  }

  render() {
    const messages = this.state.messages.map(message => {
      return <Message key={ message.timestamp } message={ message } />;
    });

    return <div className="message-list">
      { messages } 
    </div>;
  }

}
