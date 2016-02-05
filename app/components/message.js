import React from 'react';
import moment from 'moment';

function getMessage(data) {
  const { status, load } = data;

  if (status === 'normal') {
    return 'All is well once again..';
  } else {
    return `High load generated an alert - load = ${load}`;
  }
}

function label(message) {
  let classNames = ['label'];
  classNames.push(message.status === 'danger' ? 'label-danger' : 'label-success');

  return <span className={ classNames.join(' ') }>{ message.status }</span>;
}

function formatTime(timestamp) {
  return moment(timestamp).format('dddd, MMM Do YYYY');
}

export default (props) => { 

  return (
    <div className='message'>
      <h4>{ label(props.message) } - { formatTime(props.message.timestamp) }</h4>
      <p>{ getMessage(props.message) }</p>
    </div>
  );
}
