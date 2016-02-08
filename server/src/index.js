import MonitorStream from './monitor-stream';
import { start } from './server';

const server = start();
const stream = new MonitorStream(server/*, {messageDuration: 5000}*/);

stream.connect('monitor').then(()=> {
  console.log('Socket now steaming data');
});
