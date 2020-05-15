/*jshint esversion: 8 */
const firebase = require("firebase");
const config = {
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
const afAuth = firebase.auth();
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const users = [];
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());


io.on('connection', (socket) => {
        users.push({ id: parseCookies(socket.handshake.headers.cookie).uniqUid, socket: socket });
        const uniqUid = parseCookies(socket.handshake.headers.cookie).uniqUid;
        const UserRef = db.doc(`users/${uniqUid}`);
        const status = { status: 'online' };
        UserRef.set(status, {
                merge: true
        });
        console.log(parseCookies(socket.handshake.headers.cookie).uniqUid, 'ON CONNECT PROSZĘ BARDZO');
        socket.on('new-message', (message) => {
                console.log(message);
                const MessageRef = db.collection(`messages`);
                MessageRef.add(message);
        });

        socket.on('disconnect', () => {
                const uniqUid = parseCookies(socket.handshake.headers.cookie).uniqUid;
                const UserRef = db.doc(`users/${uniqUid}`);
                console.log(uniqUid, 'ON DISCONNECT PROSZĘ BARDZO');
                if (uniqUid) {

                        setTimeout(() => {
                                const status = { status: 'offline' };
                                UserRef.set(status, {
                                        merge: true
                                });
                        }, 1000);
                }
        });
});


app.route('/api/register').post(async (req, res) => {
        try {
                const result = await afAuth.createUserWithEmailAndPassword(req.body.email, req.body.password);
                SendVerificationMail();
                SetUserData(result.user);
                res.send(200, result.user);
        } catch (error) {
                res.send(400, error);
        }
});

app.route('/api/login').post(async (req, res) => {
        try {
                const result = await afAuth.signInWithEmailAndPassword(req.body.email, req.body.password);
                if (result.user && !result.user.emailVerified) {
                        res.send(400, { type: 'email', message: 'Email not Verified, check your email' });
                } else {
                        SetUserData(result.user);
                        res.send(200, result.user);
                }
        } catch (error) {
                res.send(400, error);
        }
});

app.route('/api/login-google').post(async (req, res) => {
        try {
                SetUserData(req.body);
                res.send(200, req.body);
        } catch (error) {
                res.send(400, error);
        }
});

app.route('/api/resend-email').post((req, res) => {
        try {
                SendVerificationMail();
                res.send(200, { message: 'Check your email again' });
        } catch (error) {
                res.send(400, error);
        }
});

app.route('/api/forgot-password').post(async (req, res) => {
        try {
                await afAuth.sendPasswordResetEmail(req.body.passwordResetEmail);
                res.send(200, { email: req.body.passwordResetEmail, message: 'Check your email' });
        } catch (error) {
                res.send(400, error);
        }
});


async function SendVerificationMail() {
        try {
                await afAuth.currentUser.sendEmailVerification();
        } catch (error) {
                console.log(error, 'Error in SendVerificationMail');
        }
}
function SetUserData(user) {
        const userRef = db.doc(`users/${user.uid}`);
        const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                status: 'offline'
        };
        userRef.set(userData, {
                merge: true
        });
}
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
