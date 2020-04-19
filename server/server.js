const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const users = require('./routes/users/users');
const cors = require('cors');
const csurf = require('csurf');

import { connectToMongo } from './lib/mongoConnect';

const app = express();

connectToMongo(
    'Connection Succesful(MONGO)'
);

app.use([
        express.json(),
        cookieParser(),
        bodyParser.urlencoded({ 
            extended: false 
        }),
        cors({
            origin: [
                process.env.CLIENTURLS.split(";")[0]
            ],
            credentials: true
        }),
        csurf({ 
            cookie: {
                httpOnly:true,
                maxAge: 10*60
            }
        }),
        (req, res, next) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            res.locals._csrf = req.csrfToken();
            next();
        }
]);

app.get('/', function (req, res) {
    res.json({ welcome: "Welcome to the api" })
});

app.use('/users', users);

app.listen(process.env.PORT, function () {
    console.log('Express Server Running on: ', process.env.PORT);
});