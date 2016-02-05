import React from 'react';
import Navigation from './navigation';

const {
  Component
} = React;

export default class Header extends Component {
  render() {
    return <header>
      <Navigation />
    </header>;
  }
}
