import expect from 'expect';
import http from 'http';
import app from '../../server/src/server';
import MonitorStream from '../../server/src/monitor-stream';
import io from 'socket.io-client';
import sys from 'sys';
import { exec } from 'child_process'
import { db } from '../../server/src/db';
import os from 'os';

let server;

describe('Acceptance - Message Center', function() {
  this.timeout(1800000);

  beforeEach(()=> {
    const httpServer = http.Server(app);
    server = httpServer.listen(1337);
    db.clearMessages();
  });

  afterEach(()=> {
    server.close();
    db.clearMessages();
  });

  it('receives a message for high load and returning to normal', (done)=> {
    const stream = new MonitorStream(server, {messageDuration: 1000});
    stream.connect('monitor');

    let messages = [];

    const socket = io.connect('http://localhost:1337/monitor');
    socket.on('message', (data)=> {
      /**
       * This is needed because the first connection will return any saved
       * messages in the form of an array. Of course it's empty though cause
       * this is just a test..
       */
      if (data.constructor !== Array) {
        data = [data];
      }

      messages = [...messages, ...data];

      if(messages.length === 1) {
        exec('pkill -f server/src/load.sh && killall yes', (error, stdout, stderr)=> {
          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            if (stdout) {
              console.log('STDOUT: '+stdout);
            }
            if (stderr) {
              console.log('STDERR: '+stderr);
            }

            console.log('\n*****************************\n');
            console.log('Completed the stress test. Your CPU\'s load should now start to relax.');
            console.log('\n*****************************\n');
          }
        });
      } else if (messages.length === 2) {
        expect(messages[0].status).toEqual('danger', 'The first message received should be a danger alert');
        expect(messages[1].status).toEqual('normal', 'The second message received should be a normal alert');
        done();
      }
    });

    console.log('\n*****************************\n');
    console.log('Beginning Stress Test. Please wait for the test to pass or fail. The CPU load will automatically stop after 2 minutes if nothing happens.');
    console.log('\n*****************************\n');
    exec('server/src/load.sh 120', (error, stdout, stderr)=> {
      console.log('STDOUT: '+stdout);
      console.log('STDERR: '+stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      done();
    });

  });
});
