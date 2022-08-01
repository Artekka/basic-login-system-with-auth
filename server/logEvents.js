const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'MM\/dd\/yyyy\thh:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}
`;
    console.log(logItem);

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs')), (err) => {
                if(err) throw err;
                fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), `${err}
`);
            }
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err);
    }

}

module.exports = logEvents;

/*
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
                  fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), `Directory creation: Completed!
`);
            }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err);
    }


}
*/