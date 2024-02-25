const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Creates an in-memory database

// Create a users table
db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');

    // Insert a new user
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    stmt.run('John Doe', 'john@example.com');
    stmt.finalize();

    // Retrieve and display users
    db.each('SELECT id, name, email FROM users', (err, row) => {
        console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
    });
});

// Close the database connection
db.close();
