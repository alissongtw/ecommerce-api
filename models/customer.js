const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('olist.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        address TEXT NOT NULL
    )`);
});

module.exports = db;
