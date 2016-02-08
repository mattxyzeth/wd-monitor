import expect from 'expect';
import { SocketIO, Server } from 'mock-socket';
import DataService from '../../../../app/services/data-service';

let origSocket;

describe('Unit - DataService', function() {
  this.timeout(5000);

  beforeEach(()=> {
    if (typeof window !== 'undefined') {
      origSocket = window.io;
      window.io = SocketIO;
    }
  }); 

  afterEach(()=> {
    if (typeof window !== 'undefined') {
      window.io = origSocket;
    }
  });

  it('receives data', (done)=> {
    const server = new Server('http://localhost:1337');
    server.on('connection', socket => {
      server.emit('data', 'Hello!');
    });
    
    const dataService = new DataService();
    dataService.socket = SocketIO.connect('http://localhost:1337');

    dataService.listen('data', (data)=> {
      expect(data).toEqual('Hello!');
      done();
    }); 
  });

});
