import React from 'react';
import CardDeck from './card-deck'
import Chart from './chart';

import '../styles/_data-viewer';

export default class DataViewer extends React.Component {

  render() {
    return (
      <section className="col-md-8 col-xs-12 data-viewer">
        <Chart /> 
        <CardDeck />
      </section>
    );
  }

}
