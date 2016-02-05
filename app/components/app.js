import React from 'react';
import Header from './header';
import AppStore from '../stores/app-store';

export default class App extends React.Component {
  render() {
    return <main>
      <Header />
      <section className="container-fluid"></section>
    </main>;
  }
}
