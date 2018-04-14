import express from 'express';
import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import session from 'express-session';

import db from './../models'
import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();

var config = require('./../config/config.json');

var cookieParser = require('cookie-parser')
var passport = require('passport');
var flash = require('connect-flash'); 

app.use(session({
  store: new redisStore({ host: config.redis.host, port: config.redis.port, client: client }),
  key: config.session.key,
  secret: config.session.secret,
  username: config.session.key,
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  saveUninitialized: false,
  resave: false
}));

app.use(flash());
require('./../config/passport')(passport);
app.use('/', express.static(path.join(__dirname, './../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.initialize()); 
// app.use(passport.session()); //로그인 세션 유지

app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', api);


// Middle Ware
function ensureLoggedIn() {
  return function(req, res, next) {
	console.log(req.session);
	if(!req.session.key){
		res.status(401).send({ 
			success: false, 
			message: 'You need to be authenticated to access this page!'
		});
	}else{
		next()
	}
  }
}
app.get('/hellosession',ensureLoggedIn(), (req, res, next) => {
  res.send({ success: true, message: 'You are authenticated', username: req.session.username, email: req.session.key })
});

// OK. 200
app.get('/test', (req, res) => {
	console.log("Hello Test");
	return db.Nuser.findAll().then(function(results){
		res.json(results);
	}).catch(function(err){
		console.log(err);
	});
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

/* support client-side routing */
app.get('*', (req, res) => {
	    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});
