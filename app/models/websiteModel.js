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


const WebsiteModel = mongoose.model('Website', WebsiteSchema);

WebsiteModel.getDocument = (query) => WebsiteModel.findOne(query).exec();

module.exports = WebsiteModel;
