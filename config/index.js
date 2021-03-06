'use strict';

const Config = {
  env: process.env.NODE_ENV || 'localhost',
  db: process.env.MONGOLAB_URI,
  port: process.env.PORT || 8000
};

module.exports = Config;
