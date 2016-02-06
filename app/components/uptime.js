import React from 'react';
import AppStore from '../stores/app-store';
import moment from 'moment';
import 'moment-duration-format';

import '../styles/_cards';

function updateUptime(previousState) {
  const data = AppStore.getData()[0];
  let uptime = 'Loading...';

  if (data) {
    uptime = moment.duration(data.uptime, 'seconds').format('d [days], h:mm:ss');
  }

  return { uptime };
}

export default class Uptime extends React.Component {

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.state = updateUptime();
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  }
  
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState( updateUptime );
  }

  render() {
    return (
      <div className='card uptime'>
        <div className='card-img-top'>
          <h2>{ this.state.uptime }</h2>
        </div> 
        <div className='card-block'>
          <h4 className='card-title'>Uptime</h4>
          <p className='class-text'>Time since your last reboot.</p>
        </div>
      </div>
    );
  }
}
