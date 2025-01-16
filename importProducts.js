const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');

const db = new sqlite3.Database('olist.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL
    )`);

    const insertProduct = db.prepare(`INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`);

    fs.createReadStream('products.csv')
        .pipe(csv())
        .on('data', (row) => {
            insertProduct.run(row.name, row.description, row.price, row.stock);
        })
        .on('end', () => {
            insertProduct.finalize();
            console.log('Products have been imported successfully.');
            db.close();
        });
});