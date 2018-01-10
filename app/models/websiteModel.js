/*jslint node: true */

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;


const WebsiteSchema = mongoose.Schema({
  original: {
    type: String,
    required: true,
    unique: true
  },
  tiny: {
    type: String,
    required: true,
    unique: true
  }
});


const websiteModel = mongoose.model('Website', WebsiteSchema);

websiteModel.getDocument = (query) => websiteModel.findOne(query).exec();

module.exports = websiteModel;
