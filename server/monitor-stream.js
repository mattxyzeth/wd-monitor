import monitor from 'os-monitor';
import os from 'os';
import IO from 'socket.io';

export default class MonitorStream {

  constructor(server) {
    this.isMonitoring = false;
    this.io = IO(server);
    this.threshold = os.cpus().length;
    this.status = 'normal';
  }

  checkStatus() {
    const load = os.loadavg()[0];

    if (load > this.threshold && this.status === 'normal') {
      this.status = 'danger';
      this.sendStatus({ load });
    } else if (this.status === 'danger') {
      this.status = 'normal';
      this.sendStatus();
    }
    console.log('Status: ' + this.status);
  }

  connect(endpoint) {
    return new Promise((resolve, reject)=> {
      this.io.of(endpoint).on('connection', (socket)=> {
        this.socket = socket;

        if (!this.isMonitoring) {
          this.startMonitoring();
          resolve(socket);
        }

      });
    });
  }
  
  loadAlert() {
    const timestamp = new Date().getTime();
    const load = os.loadavg()[0];

    this.status = 'danger';

    this.sendStatus({ load, timestamp });
  }

  monitor(event) {
    const timestamp = new Date().getTime();
    const loadAvg = os.loadavg();
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

  sendStatus(message={}) {
    message.status = this.status;
    message.timestamp = new Date().getTime();

    this.socket.emit('message', message);
  }

  startMonitoring() {
    this.isMonitoring = true;

    monitor.on('monitor', this.monitor.bind(this));

    this.statusTimer = setInterval(this.checkStatus.bind(this), 120000);

    monitor.start({
      delay: 10000,
      critical1: os.cpus().length,
      immediate: true
    });
  }
}
