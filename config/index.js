'use strict';

const
    env = process.env.NODE_ENV || 'localhost',
    db = process.env.MONGOLAB_URI,
    port = process.env.PORT || 8000;

const Config = {
  env: env,
  db: db,
  port: port
};

module.exports = Config;
