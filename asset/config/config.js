const express = require("express");
const app = express();
var http = require('http');
var server = http.createServer(app);

server.on('error', function (e, res) {
    if (e) {
        if (e.code === 'EADDRINUSE') {
            console.log('Main Port ' + port + 'in use, retrying...');
            setTimeout(() => {
                server.close();
                server.listen(port);
            }, 1000);
        }
        if (e.code === 'ECONNRESET') {
            console.log('TCP conversation abruptly closed its end of the connection for port:' + port + 'Trying to reconnect....');
            setTimeout(() => {
                server.close();
                server.listen(port);
            }, 1000);
        }
        if (e.code === 'EACCES') {
            console.log(port + 'requires elevated privilege.Trying to reconnect.....')
            setTimeout(() => {
                server.close();
                server.listen(port);
            }, 1000);
        }
    }
});
var config = {
    db: {
        connectionString: "postgresql://postgres:123456@localhost:5432/Squash_Test"
    },
    apiUrlPort: {
        port: 96
    }

}
module.exports = config;