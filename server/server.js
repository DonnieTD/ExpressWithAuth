import { connectToMongo } from './lib/mongoConnect';

connectToMongo('Connection Succesful(MONGO)');

const [express,bodyParser,cookieParser,users,cors,csurf] = [
    require('express'),
    require('body-parser'),
    require('cookie-parser'),
    require('./routes/users/users'),
    require('cors'),
    require('csurf'),
  
];

const app = express();

app.use([
    express.json(),
    cookieParser(),
    bodyParser.urlencoded({ extended: false }),
    cors({origin: process.env.CLIENTURLS.split(";")[0],credentials: true}),
    csurf({ cookie: {   httpOnly: true, maxAge: 10*60   }}),
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

app.listen(process.env.PORT,() => {console.log('Express Server Running on: ', process.env.PORT)});