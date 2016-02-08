import React from 'react';
import moment from 'moment';
import { message, label, formatTime } from 'utils/message-utils';


export default (props) => { 

  return (
    <div className='message'>
      <h4>{ label(props.message) } - { formatTime(props.message.timestamp) }</h4>
      <p>{ message(props.message) }</p>
    </div>
  );
}
