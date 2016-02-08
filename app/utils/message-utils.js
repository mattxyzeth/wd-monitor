import React from 'react';
import moment from 'moment';

export function message(data) {
  const { status, load } = data;

  if (status === 'normal') {
    return 'All is well once again...';
  } else {
    return `High load generated an alert - load = ${load}`;
  }
}

export function label(message) {
  let classNames = ['label'];
  classNames.push(message.status === 'danger' ? 'label-danger' : 'label-success');

  return <span className={ classNames.join(' ') }>{ message.status }</span>;
}

export function formatTime(timestamp) {
  return moment(timestamp).format('dddd, MMM Do [at] h:mm:ss a');
}

