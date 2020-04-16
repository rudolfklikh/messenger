const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const users = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
        console.log('user connected');
        users.push({id: parseCookies(socket.handshake.headers.cookie).uniqUid, socket: socket});


        socket.on('new-message', (message) => {
                console.log(message);
                const user = users.filter((user) => user.id === message.uniqUID)[0];
                user.socket.emit('new-message', message.msg);
        });
});

function parseCookies(request) {
        var list = {},
                rc = request;

        rc && rc.split(';').forEach(function (cookie) {
                var parts = cookie.split('=');
                list[parts.shift().trim()] = unescape(parts.join('='));
        });

        return list;
}


server.listen(port, () => {
        console.log(`started on port: ${port}`);
});
