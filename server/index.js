import express from 'express';
import MonitorStream from './monitor-stream';

const app = express();

const server = app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

const stream = new MonitorStream(server);

stream.connect('monitor').then(()=> {
  console.log('Socket now steaming data');
});
