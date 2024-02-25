const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db'); // Connects to the existing test.db database file

// Create a users table
db.serialize(() => {
//    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');

    // Insert a new user
    const stmt = db.prepare('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)');
    stmt.run(19511951, 'zyou', 'zyou@gmail.com', 'secret');
    stmt.finalize();

    // Retrieve and display users
    db.each('SELECT id, username, email, password FROM users', (err, row) => {
        console.log(`User ID: ${row.id}, Username: ${row.username}, Email: ${row.email}, Password: ${row.password}`);
    });
});

// Close the database connection
db.close();
