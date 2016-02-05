import monitor from 'os-monitor';
import os from 'os';
import IO from 'socket.io';

export default class MonitorStream {

  constructor(server) {
    this.io = IO(server);
  }

  connect(endpoint) {
    return new Promise((resolve, reject)=> {
      this.io.of(endpoint).on('connection', function(socket) {
        this.socket = socket;
        startMonitoring();
        resolve(socket);
      });
    });
  }
  
  loadAlert(event) {
    const timestamp = new Date().getTime();
    const load = os.loadAvg()[0];

    sendMessage('danger', { load, timestamp });
  }

  sendMessage(type, message={}) {
    message.status = type;
    this.socket.emit('message', message);
  }

  monitor(event) {
    const timestamp = new Date().getTime();
    const loadAvg = os.loadAvg();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const uptime = os.uptime();

    this.socket.emit('monitor', {
      timestamp,
      loadAvg,
      freeMem,
      totalMem,
      uptime
    });
  }


  startMonitoring() {
    monitor.on('monitor', monitor);
    monitor.throttle('loadavg1', loadAlert, monitor.minutes(2));

    monitor.start({
      delay: 10000,
      critical1: os.cpus().length,
      immediate: true
    });
  }
}
