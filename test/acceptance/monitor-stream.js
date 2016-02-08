import expect from 'expect';
import http from 'http';
import app from '../../server/src/server';
import MonitorStream from '../../server/src/monitor-stream';
import io from 'socket.io-client';

let server;

describe('Acceptance - MonitorStream', function() {
  this.timeout(12000);

  beforeEach(()=> {
    const httpServer = http.Server(app);
    server = httpServer.listen(1337);
  });

  afterEach(()=> {
    server.close();
  });

  it('streams the data through a socket', (done)=> {
    const stream = new MonitorStream(server);
    stream.connect('monitor');

    const socket = io.connect('http://localhost:1337/monitor');
    socket.on('monitor', (data)=> {
      socket.disconnect();
      done();
    });
  });

});
