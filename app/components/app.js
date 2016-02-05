import React from 'react';
import Header from './header';
import DataViewer from './data-viewer';
import Messages from './messages';

export default class App extends React.Component {
  render() {
    return <main>
      <Header />
      <section className="container-fluid top-container">
        <div className="row">
          <DataViewer />
          <Messages />
        </div>
      </section>
    </main>;
  }
}
