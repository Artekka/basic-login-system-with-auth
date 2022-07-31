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
    const accountName = req.body.accountName;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO accounts (accounts_name, accounts_email, accounts_password) VALUES (?,?,?)', [accountName, email, password]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Account information inserted into database");
        }
    }
    ;
});


app.listen(3001, () => {
    console.log('Server Status: Up and running on port: ' + PORT);
})