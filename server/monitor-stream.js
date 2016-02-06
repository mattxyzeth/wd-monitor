import monitor from 'os-monitor';
import os from 'os';
import IO from 'socket.io';
import db from './db';

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
    } else if (load < this.threshold && this.status === 'danger') {
      this.status = 'normal';
      this.sendStatus();
    }

    //console.log('Status: ' + this.status);
  }

  connect(endpoint) {
    return new Promise((resolve, reject)=> {
      this.io.of(endpoint).on('connection', (socket)=> {
        this.socket = socket;

        if (!this.isMonitoring) {
          this.startMonitoring();
          resolve(socket);
        }

        db.get('messages').then(messages => {
          if (messages) {
            this.socket.emit('message', messages);
          }
        });

        db.get('snapshots').then(snapshots => {
          if (snapshots && snapshots.length) {
            const totalMem = os.totalmem();

            snapshots.forEach(snapshot => {
              snapshot.totalMem = totalMem;
            });

            this.socket.emit('monitor', snapshots);
          }
        });

      });
    });
  }
  
  monitor(event) {
    const timestamp = new Date().getTime();
    const [ loadAvg1, loadAvg5, loadAvg15 ] = os.loadavg();
    const freeMem = os.freemem();
    const uptime = os.uptime();

    const snapshot = {
      freeMem,
      uptime,
      loadAvg1,
      loadAvg5,
      loadAvg15,
      timestamp
    };

    db.save('snapshots', snapshot);

    snapshot.totalMem = os.totalmem();
    this.socket.emit('monitor', snapshot);
  }

  sendStatus(message={}) {
    message.status = this.status;
    message.timestamp = new Date().getTime();

    db.save('message', message);

    this.socket.emit('message', message);
  }

  startMonitoring() {
    this.isMonitoring = true;

    monitor.on('monitor', this.monitor.bind(this));

    this.statusTimer = setInterval(this.checkStatus.bind(this), 10000);

    monitor.start({
      delay: 10000,
      critical1: os.cpus().length,
      immediate: true
    });
  }
}
