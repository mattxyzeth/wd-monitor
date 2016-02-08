import React from 'react';
import MessageList from './message-list';
import AppActions from '../actions/app-actions';

import '../styles/_messages';

export default class Messages extends React.Component {
  
  render() {
    return (
      <section className="col-md-4 col-xs-12 messages">
        <h2>
          Messages
          <button onClick={AppActions.clearMessages} className="btn btn-sm btn-secondary pull-xs-right">Clear</button>
        </h2>
        <MessageList />
      </section>
    );
  }

}
