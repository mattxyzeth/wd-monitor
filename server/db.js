import fs from 'fs';
import sqlite3 from 'sqlite3';
import path from 'path';

class DB {

  constructor() {
    const file = path.join(__dirname, 'data/store.db');
    const exists = fs.existsSync(file);

    sqlite3.verbose();

    this.db = new sqlite3.Database(file);
    this.db.run('CREATE TABLE IF NOT EXISTS messages (status TEXT, load REAL NULL, timestamp INTEGER)');
  }

  saveMessage(message) {
    const { status, load, timestamp } = message;
    const stmt = this.db.prepare('INSERT INTO messages VALUES (?, ?, ?)');

    stmt.run(status, load, timestamp);

    stmt.finalize();
  }

  getMessages() {
    return new Promise((resolve, reject)=> {
      this.db.all('SELECT * FROM messages ORDER BY timestamp DESC', (err, messages)=> {
        if (err) {
          reject(err);
        } else {
          resolve(messages);
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
