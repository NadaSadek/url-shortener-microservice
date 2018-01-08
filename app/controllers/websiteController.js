'use strict';

const mongoose = require('mongoose');
const WebsiteModel = require('../models/websiteModel')


exports.generate_tiny_url = (req, res) => {
  	//generate url id (shortened url)
  const RANDOM_ID = Math.floor(Math.random() * (9000 - 1) + 1);
  const WebsiteEntry = {original: req.params.url, tiny: req.hostname + '/' + RANDOM_ID};
	WebsiteModel.create(WebsiteEntry, function(err, website) {
		if(err) handleError('err', err);
		res.json(WebsiteEntry);
	});
};

exports.get_original_url = (req, res) => {
  WebsiteModel.find({tiny: req.params.tinyUrl}, (err, website) => {
  	if(err) return handleError(err);
  	res.redirect(Website.original);
  });
};
