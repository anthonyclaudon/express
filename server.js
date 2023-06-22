require('dotenv').config();
const http = require('http');
const app = require('./app');

const environment = process.env.ENV;

app.set('port', process.env.PORT);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + app.get('port');
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
    console.log(`Listening on ${app.get('port')}\nEnvironment : ${environment}`);
});

server.listen(app.get('port'));
