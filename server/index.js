const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const serverPORT = process.env.PORT || 3002;
const appPORT = 3001;

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
            console.log(`Account registered: ${accountName}.`);
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

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf-8' : '');
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            {'Content-Type': contentType});
        response.end(data);
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500; // Server error, cannot read data
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    }
}

const server = http.createServer((req,res) => {
    console.log(req.url,req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/jpeg';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);
    // If a user attempts to GET a file or page without typing .html
    // append .html and serve the web page
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        // Could serve either a 404 not found or
        // 301 redirect
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
        default:
            //res.writeHead(404, {'Location': '/404.html'});
            serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

app.listen(appPORT, () => {
    console.log('Server Status: Up and running on port: ' + appPORT);
});

// the listen should always be at the bottom of the code
server.listen(serverPORT, () => console.log(`Server running on port ${serverPORT}`));