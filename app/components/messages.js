import React from 'react';
import MessageList from './message-list';

import '../styles/_messages';

export default class Messages extends React.Component {
  
  render() {
    return (
      <section className="col-md-4 messages">
        <h2>Messages</h2>
        <MessageList />
      </section>
    );
  }

}
