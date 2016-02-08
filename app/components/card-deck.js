import React from 'react';
import PieChart from './pie-chart';
import Uptime from './uptime';

export default class CardDeck extends React.Component {
 
  render() {
    return (
      <div className='row'>
        <div className='card-deck-wrapper col-xs-12'>
          <div className='card-deck'>
            <PieChart />
            <Uptime />
          </div>
        </div>
      </div>
    );
  }

}
