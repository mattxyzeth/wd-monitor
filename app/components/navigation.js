import React from 'react';

const {
  Component
} = React;

export default class Navigation extends Component {
  render() {
    return <nav className='navbar navbar-dark'>
      <a className="navbar-brand" href="#">Load Monitor</a>
    </nav>;
  }
}
