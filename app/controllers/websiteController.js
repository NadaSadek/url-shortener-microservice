'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const WebsiteModel = require('../models/websiteModel');


exports.generate_tiny_url = (req, res) => {
  	//generate url id (shortened url)
  const RandomId = Math.floor(Math.random() * (9000 - 1) + 1);
  console.log(req.params.url);
  const WebsiteDocument = {original: req.params.url, tiny: RandomId};
	return WebsiteModel.create(WebsiteDocument)
    .then((website) => res.json(WebsiteDocument))
    .catch((err) => {
      if(err.code === 11000) {
        return WebsiteModel.getDocument({original: req.params.url})
          .then((website) => res.json({original: req.params.url, tiny: website.tiny}))
          .catch((err) => res.status(500).json({error: err}));
      }
      else res.status(500).json({error: err});
    });
};

exports.get_original_url = (req, res, next) => {
  console.log('req.params.tiny', req.params.tiny);
  return WebsiteModel.getDocument({tiny: req.params.tiny})
    .then((website) => {
      res.redirect(301,website.original);
      next();
    })
    .catch((err) => res.status(500).json({error: err}));
};
