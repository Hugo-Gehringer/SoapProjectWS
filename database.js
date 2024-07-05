const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./todolist.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, assignation TEXT)");
});

module.exports = db;
