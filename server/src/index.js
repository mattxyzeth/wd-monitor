import express from 'express';
import MonitorStream from './monitor-stream';
import db from './db';
import cors from 'express-cors';

const app = express();

app.use(cors({
  allowedOrigins: ['localhost:3001']
}));

app.delete('/messages', (req, res)=> {
  db.clearMessages().then(()=> {
    res.sendStatus(200);
  }, (error)=> {
    res.status(500).send(error);
  });
});

const server = app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});

const stream = new MonitorStream(server);

stream.connect('monitor').then(()=> {
  console.log('Socket now steaming data');
});
