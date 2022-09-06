const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

const serverPORT = 3006;
const appPORT = process.env.PORT || 3001;

// Connect to the MySQL database

const db = mysql.createConnection({
    // Put all the local database info here
    host: process.env.MYSQL_HOST || 'localhost',
    //port: process.env.MYSQL_PORT || 3006,
    user: process.env.MYSQL_USER ||'root',
    password: process.env.MYSQL_PASSWORD ||'12345sam',
    database: process.env.MYSQL_DATABASE ||'einherjar'
});

db.on('error', function(err) {
    console.log("We ded lawl");
    console.log(err)
})
// Basic POST request w/ route

app.post('/register', (req,res) => {
    const { accountName, email, password } = req.body;

    db.query('INSERT INTO accounts (accounts_name, accounts_email, accounts_password) VALUES (?,?,?)', [accountName, email, password]), (err, result) => {
        if(err) {
            console.log(result);
            res.send({message: "There was an error."});
        }
        else {
            console.log(`Account registered ${accountName}.`);
            res.send({message: `Account registered: ${accountName}.`});
        }
    };
    
    db.query('SELECT * FROM accounts WHERE accounts_name = ? AND accounts_password = ?', [accountName, password],
    (err, result) => {
        if(err) {
            console.log(result);
            res.send({message: "There was an error."});
        }
        else {
            console.log(`Account registered ${accountName}.`);
            res.send({message: `Account registered: ${accountName}.`});
        }
    });

});

// Basic Login w/ route using POST
app.post('/login', (req,res) => {
    const { accountName, email, password } = req.body;

    db.query('SELECT * FROM accounts WHERE accounts_name = ? AND accounts_password = ?', [accountName, password],
    (err, result) => {
        if(err) {
            console.log(err);
            res.send({ err: err });
        }
        if(result.length > 0) {
            console.log(`Login successful for account: ${accountName}`);
            res.send({message: `Login successful for account: ${accountName}`});
        }
        else {
            console.log("Wrong username/password combination.");
            res.send({message: "Wrong username/password combination."});
        }
    });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//app.listen(9000);

/* // Basic GET request w/ route
app.get('/accountList', (req,res) => {

    db.query('SELECT * FROM accounts', (err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Account information retrieved from database");
            res.send(result);
        }
    });
}); */

app.listen(appPORT, () => {
    console.log('Server Status: Up and running on port: ' + appPORT);
});