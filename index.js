/*jslint node: true */

'use strict';

const
		express = require('express'),
 		path = require('path'),
		mongoose = require('mongoose'),
		config = require('./config'),
		bodyParser = require('body-parser');

// Connect to Mongoose
mongoose.connect(config.db, (err) => {
	console.error('Mongoose error', err.stack);
	process.exit(1);
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('Mongoose default connection open to ' + config.db));

// Init App
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "pug");
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const websiteRouter = require('./app/routes/websiteRoute');
app.use(websiteRouter);

// app settings

app.on('error', (err) => console.error('app couldn\'t start', err));
app.listen(config.port, (err) => {
  if(err) console.error('app issue', err);
  console.log('app is listening on port', config.port);
});
