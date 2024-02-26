const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db'); // Connects to the existing test.db database file
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const userId = 1
  getSubDataByUID(userId, (error, subData) => {
     if (error) {
         console.error('Error:', error);
         res.status(500).send('Internal Server Error');
         return;
     }
     res.json(subData);
  });
});

//app.get('/', (req, res) => {
//  getAllUserData((error, userList) => {
//     if (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//         return;
//     }
//     res.json(userList);
//  });
//});

//getSubDataByUID(1, (error, subData) => {
//     if (error) {
//         console.error('Error:', error);
//     } else {
//        console.log("HI");
//     }
//  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Function to add a user
function addUser(userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration) {
    const stmt = db.prepare('INSERT INTO users (userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration);
    stmt.finalize();
}

// Callback function to get subscription data by UserID
function getSubDataByUID(userId, callback) {
    const sql_statement = `SELECT coffeeChoice, subscriptionFrequency, subscriptionDuration, subscriptionStatus FROM users WHERE userId = ?`;

    db.get(sql_statement, [userId], (err, row) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }

        if (!row) {
            // User not found
            callback(new Error('User not found'), null);
            return;
        }

        console.log("Getting subData: " + row.coffeeChoice);


        // Close the database connection
        db.close();

        // Call the callback with the row
        callback(null, row);
    });
}


// Callback function to get all user data
function getAllUserData(callback) {
    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users';
    const userList = [];

    db.each(sql_statement, (err, row) => {
        console.log("Getting userData: " + row);
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

// Function to display all users and their data
function displayAllUsers() {
    const sql_statement = 'SELECT userID, name, email, phoneNo, address, subscriptionStatus, coffeeChoice, subscriptionFrequency, subscriptionDuration FROM users'

    db.each(sql_statement, (err, row) => {
        console.log(`User ID: ${row.userID}, Name: ${row.name}, Email: ${row.email}, Phone No: ${row.phoneNo}, Address: ${row.address}, Subscription Status: ${row.subscriptionStatus}, Coffee Choice: ${row.coffeeChoice}, Subscription Frequency: ${row.subscriptionFrequency}, Subscription Duration: ${row.subscriptionDuration}`);
    });

    db.close();
}