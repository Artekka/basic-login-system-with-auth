const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = 3001;

// Connect to the MySQL database

const db = mysql.createConnection({
    // Put all the local database info here
    user: 'root',
    host: 'localhost',
    password: '12345sam',
    database: 'einherjar',
    insecureAuth : true
});

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



app.listen(3001, () => {
    console.log('Server Status: Up and running on port: ' + PORT);
})