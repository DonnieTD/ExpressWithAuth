const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const users = require('./routes/users/users');
const cors = require('cors');
const csrf = require('csurf');

import { connectToMongo } from './lib/mongoConnect';

const app = express();

connectToMongo(
    'mongodb://mongo:27017/',
    'DBNAME',
    'Connection Succesful(MONGO)'
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ credentials: true }));
app.use(csrf({ cookie: true }))

// Send CSRF token in a cookie
app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { path: '/', secure: true, maxAge: 600000, sameSite: 'strict' });
    next();
});

// Come and get your CSRF token bruv
app.get('/', (req, res) => res.send({ csrfToken: req.csrfToken() }));

app.use('/users', users);

app.listen(4000, function () {
    console.log('Express Server Running on: ', 4000);
});