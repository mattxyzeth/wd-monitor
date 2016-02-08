import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';
import d3 from 'd3';
import AppStore from '../stores/app-store';

function updateC3(previousState) {
  const { data } = AppStore;
  const { c3 } = previousState;
  
  let columns = data.reduce((result, snapshot)=> {
    const { loadAvg1, loadAvg5, loadAvg15 } = snapshot;
    [ loadAvg1, loadAvg5, loadAvg15 ].forEach((avg, i)=> result[i].push(avg)); 

    return result;
  }, [['current'], ['Avg. 5mins'], ['Avg 15mins']]);

  c3.load({ columns });

  return { c3 };
} 

export default class Chart extends React.Component {
  
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    const chart = c3.generate({
      bindto: '.chart',
      data: {
        columns: []
      },
      axis: {
        y: {
          tick: {
            format: y => {
              return Math.round(y*100) / 100;
            }
          }
        },
        y2: { show: true }
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
    this.setState( updateC3 );
  }

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h1>Average CPU Load</h1>
          <div className="chart"></div>
        </div>
      </div>
    );
  }
}
