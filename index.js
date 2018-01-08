/*jslint node: true */

'use strict';

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');


// Connect to Mongoose
mongoose.connect(config.db);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('Mongoose default connection open to ' + config.db));

// Init App
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const WebsiteRouter = require('./app/routes/websiteRoute');
app.use(WebsiteRouter);

// app settings
app.set('env', config.env);
app.set('hostname', config.hostname);
app.set('port', config.port);
const port = app.get('port');

app.on('error', (err) => console.error('app couldn\'t start', err));
app.listen(config.port, (err) => {
  if(err) console.error('app issue', err);
  console.log('app is listening on port', port);
});

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'});
// });
