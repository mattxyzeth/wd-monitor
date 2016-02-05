import io from 'socket.io-client/socket.io';

export default class DataService {

  constructor(host, endpoint) {
    this.socket = io.connect([host, endpoint].join('/'));
  }

  listen(channel, callback) {
    this.socket.on(channel, callback);
  } 

}
