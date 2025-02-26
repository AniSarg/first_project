const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();

// Enable CORS for all domains or specify a domain
app.use(cors({
  origin: '*',  // Allow all origins (for development purposes)
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Serve index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve profile picture
app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// MongoDB connection URLs
const mongoUrlLocal = "mongodb://admin:pass@localhost:27017";
const mongoUrlDocker = "mongodb://admin:pass@mongodb";  // This assumes MongoDB is running on a Docker container

// MongoDB connection options
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const databaseName = "user-account";  // Change to your database name

// Route to update profile
app.post('/update-profile', function (req, res) {
  const userObj = req.body;

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    const db = client.db(databaseName);
    userObj['userid'] = 1;  // Add or update the user ID

    const myquery = { userid: 1 };
    const newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, { upsert: true }, function(err, result) {
      if (err) throw err;
      client.close();
    });
  });

  res.send(userObj);  // Send the user data back to the client
});

// Route to get profile
app.get('/get-profile', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    const db = client.db(databaseName);
    const myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send the response (or an empty object if no data found)
      res.send(response ? response : {});
    });
  });
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
