import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import AppActions from './actions/app-actions';

import './styles/app';

ReactDOM.render(<App />, document.getElementById('main'));

AppActions.streamData();
AppActions.listenForMessages();
