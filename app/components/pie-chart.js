import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';
import AppStore from '../stores/app-store';

function updatePieChart(previousState) {
  const data = AppStore.getData()[0];
  const { c3 } = previousState;
  
  let columns = [];
  if (data) {
    columns = [
      ['Free Memory', data.freeMem],
      ['Total Memory', data.totalMem]
    ];
  }
  
  c3.load({ columns });

  return { c3 };
}

export default class PieChart extends React.Component {

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    const chart = c3.generate({
      bindto: '.pie-chart',
      data: {
        type: 'pie',
        columns: []
      }
    });

    this.setState({ c3: chart });
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  }
  
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState( updatePieChart );
  }

  render() {
    return (
      <div className='card'>
        <div className='card-img-top pie-chart'></div> 
        <div className='card-block'>
          <h4 className='card-title'>Memory</h4>
          <p className='class-text'>Available Memory for your system.</p>
        </div>
      </div>
    );
  }

}
