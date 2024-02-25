const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db'); // Connects to the existing test.db database file
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  // Example usage:
  getAllUserData((error, userList) => {
     if (error) {
         console.error('Error:', error);
     } else {
        console.log(userList);
     }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Function to add a user
function addUser(userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration) {
    const stmt = db.prepare('INSERT INTO users (userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration);
    stmt.finalize();
}

// Callback function to get all user data
function getAllUserData(callback) {
    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users';
    const userList = [];

    db.each(sql_statement, (err, row) => {
        console.log("Getting row: " + row);
        userList.push(row);
    }, (err, rowCount) => {
        // Callback after all rows have been processed
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }

        // Close the database connection
        db.close();

        // Call the callback with the list of rows
        callback(null, userList);
    });
}

// Function to display all users
function displayAllUsers() {
    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users'

    db.each(sql_statement, (err, row) => {
        console.log(`User ID: ${row.userID}, Name: ${row.name}, Email: ${row.email}, Phone No: ${row.phoneNo}, Address: ${row.address}, Subscription Status: ${row.subscriptionStatus}, Coffee Choice: ${row.coffeeChoice}, Subscription Frequency: ${row.subscriptionFrequency}, Subscription Duration: ${row.subscriptionDuration}`);
    });
}

//// Create a users table
//db.serialize(() => {
////    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
//
//    // Insert a new user
//    const stmt = db.prepare('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)');
//    stmt.run(19511951, 'zyou', 'zyou@gmail.com', 'secret');
//    stmt.finalize();
//
//    // Retrieve and display users
//    db.each('SELECT id, username, email, password FROM users', (err, row) => {
//        console.log(`User ID: ${row.id}, Username: ${row.username}, Email: ${row.email}, Password: ${row.password}`);
//    });
//});

// Close the database connection
