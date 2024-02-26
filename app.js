const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db'); // Connects to the existing test.db database file
const express = require('express')
const path = require('path');  // Include the path module
const app = express()
const port = 3000
const ejs = require('ejs');
app.set('view engine', 'ejs'); // Set EJS as the view engine
const staticDirectory = path.join(__dirname, 'views');
console.log(staticDirectory);
app.use(express.static(staticDirectory));
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(bodyParser.json());


app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/CoffeePages/StartSubscriptionPage.html');
});

app.post('/submit', (req, res) => {
    console.log(req.body.userID);
    const userID = req.body.userID;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const address = req.body.address;
    const coffeeChoice = req.body.coffeeChoice;
    const frequency = req.body.frequency;
    const duration = req.body.duration;

    // Call the addUser function to add the user to the database
    addUser(userID, name, email, phoneNo, address, 'active', coffeeChoice, frequency, duration);
    res.send('Subscription started successfully!'); // Send a response back to the client

});

app.get('/subscriptions', (req, res) => {
  const userId = 3141;
  getSubDataByUID(userId, (error, subData) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('test', { subData }); // Render index.ejs with subData
  });
});

// Explicitly set MIME type for script.js
app.get('/script.js', (req, res) => {
  res.type('application/javascript');
  // Code to send script.js file
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//app.get('/', (req, res) => {
//  const userId = 1
//  getSubDataByUID(userId, (error, subData) => {
//     if (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//         return;
//     }
//     res.json(subData);
//  });
//});

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

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

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

        console.log("Getting subData: " + row);


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

displayAllUsers();