import os from 'os';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import path from 'path';

class DB {

  constructor() {
    const file = path.join(__dirname, 'data/store.db');
    const exists = fs.existsSync(file);

    sqlite3.verbose();

    this.db = new sqlite3.Database(file);
    this.db.serialize(()=> {
      this.db.run('CREATE TABLE IF NOT EXISTS messages (status TEXT, load REAL NULL, timestamp INTEGER)');
      this.db.run('CREATE TABLE IF NOT EXISTS snapshots (freeMem INTEGER, uptime INTEGER, loadAvg1, loadAvg5, loadAvg15, timestamp INTEGER)');

      if (!exists) {
        // Seed the DB
        let stmt1 = this.db.prepare('INSERT INTO snapshots VALUES(?, ?, ?, ?, ?, ?)');

        const now = new Date().getTime();
        for (let i=0; i < 40; i++) {
          let loadAvg = os.loadavg();
          stmt1.run(
            os.freemem(),
            os.uptime(),
            loadAvg[0],
            loadAvg[1],
            loadAvg[2],
            now + 10000
          );
        }

        stmt1.finalize();
      }
    });
  }

  save(table, data) {
    return new Promise((resolve, reject)=> {
      const keys = Object.keys(data);
      const values = keys.map(key => data[key]);

      let query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.map(value => '?').join(', ')})`;

      this.db.run(query, values, (err)=> {
        if (err) {
          reject(err);
        } else {
          resolve()
        }
      });

    });
  }

  get(table) {
    return new Promise((resolve, reject)=> {
      this.db.all(`SELECT * FROM ${table} ORDER BY timestamp DESC`, (err, resources)=> {
        if (err) {
          reject(err);
        } else {
          resolve(resources);
        }
      });
    });
  }

  clearMessages() {
    return new Promise((resolve, reject)=> {
      this.db.run('DELETE FROM messages', (err)=> {
        console.log(...arguments);
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default new DB();
