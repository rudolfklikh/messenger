var firebase = require("firebase");
var config = {
        apiKey: 'AIzaSyDah1j8JcfnfaP-G38kulnfEXEkfxXT_ak',
        authDomain: 'messenger-diploma.firebaseapp.com',
        databaseURL: 'https://messenger-diploma.firebaseio.com',
        projectId: 'messenger-diploma',
        storageBucket: 'messenger-diploma.appspot.com',
        messagingSenderId: '857892389615',
        appId: '1:857892389615:web:5318c77a15c4460376911a',
        measurementId: 'G-P1PX0ZX1GM'
};
firebase.initializeApp(config);
const db = firebase.firestore();
const dataBase = firebase.database();



const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const users = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
        console.log('CONNECTION');
        console.log(parseCookies(socket.handshake.headers.cookie).uniqUid);
        users.push({ id: parseCookies(socket.handshake.headers.cookie).uniqUid, socket: socket });
        socket.on('new-message', (message) => {
                const user = users.filter((user) => user.id === message.uniqUID)[0];
                const user2 = users.filter((user) => user.id === message.yourUniqUID)[0];
                user.socket.emit('new-message', message);
                user2.socket.emit('new-message', message);
        });

        socket.on('disconnect', () => {
                const uniqUid = parseCookies(socket.handshake.headers.cookie).uniqUid;
                const UserRef = db.doc(`users/${uniqUid}`);
                setTimeout(() => {
                        const status = { status: 'offline' };
                        UserRef.set(status, {
                                merge: true
                        });
                }, 1000);
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
