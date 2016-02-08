import express from 'express';
import { db } from './db';
import cors from 'express-cors';
import path from 'path';

const app = express();

let rootPath;

switch(process.env.NODE_ENV) {
  case 'production':
    rootPath = path.resolve(__dirname, '../../public');
    break;
  case 'test':
    rootPath = path.resolve(__dirname, '../../tmp');
    break;
  default:
    rootPath = path.resolve(__dirname, '../../dist');
    break;
}

app.use(express.static(rootPath));
app.use(cors({
  allowedOrigins: ['localhost:3001']
}));

app.get('/', (req, res)=> {
  res.sendFile(path.join(rootPath, 'index.html'));
});

app.delete('/messages', (req, res)=> {
  db.clearMessages().then(()=> {
    res.sendStatus(200);
  }, (error)=> {
    res.status(500).send(error);
  });
});

export default app;

export function start() {
  return app.listen(3000, ()=> {
    console.log('WatchDog on guard.');
  });
}
