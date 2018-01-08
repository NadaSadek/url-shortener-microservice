'use strict';

let mongoose = require('mongoose');

const WebsiteSchema = mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  tiny: {
    type: String,
    required: true
  }
});

const UrlModel = mongoose.model('Website', WebsiteSchema);

module.exports = UrlModel;
