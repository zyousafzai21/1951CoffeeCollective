const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db'); // Connects to the existing test.db database file

// Function to insert a new user
function insertUser(id, username, email, password) {
    const stmt = db.prepare('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)');
    stmt.run(id, username, email, password);
    stmt.finalize();
}

// Callback function to get all user data
function getAllUserData(callback) {
    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users';
    const userList = [];

    db.each(sql_statement, (err, row) => {
//        console.log(row);
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

// Example usage:
getAllUserData((error, userList) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('User List:', userList);
    }

    // Close the database connection (if needed)
    db.close();
});

//function getAllUserData() {
//    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users'
//    const userList = [];
//
//    db.each(sql_statement, (err, row) => {
//        console.log(row);
//        userList.push(row);
//    });
//
//    return userList;
//}

// Function to display all users
function displayAllUsers() {
    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users'

    db.each(sql_statement, (err, row) => {
        console.log(`User ID: ${row.userID}, Name: ${row.name}, Email: ${row.email}, Phone No: ${row.phoneNo}, Address: ${row.address}, Subscription Status: ${row.subscriptionStatus}, Coffee Choice: ${row.coffeeChoice}, Subscription Frequency: ${row.subscriptionFrequency}, Subscription Duration: ${row.subscriptionDuration}`);
    });
}

//console.log(getAllUserData());
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
