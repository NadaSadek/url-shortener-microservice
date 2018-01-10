'use strict';

const mongoose = require('mongoose'),
      express = require('express');
mongoose.Promise = Promise;

const websiteModel = require('../models/websiteModel');

const urlValidator = (url) => {
const regex = new RegExp("^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
const result = regex.test(url);
return result;
};




exports.generate_tiny_url = (req, res) => {

  const RandomId = Math.floor(Math.random() * (9000 - 1) + 1);
  console.log(req.params[0]);
  if(urlValidator(req.params[0])){

    const websiteDocument = {original: req.params[0], tiny: RandomId};
  	return websiteModel.create(websiteDocument)
      .then((website) => res.status(200).json(websiteDocument))
      .catch((err) => {
        if(err.code === 11000) {
          return websiteModel.getDocument({original: req.params[0]})
            .then((website) => res.json({original: req.params[0], tiny: website.tiny}))
            .catch((err) => res.status(500).json({error: err}));
        }
        else res.status(500).json({error: err});
      });
  }
  else res.status(500).json({error: 'invalid url'});
};

exports.get_original_url = (req, res) => {
  try {
  return websiteModel.getDocument({tiny: req.params.tiny})
    .then((website) => {
      res.redirect(website.original);
    })
    .catch((err) => res.status(500).json({error: err}));
  }
  catch(e){
    console.log('e ',e);
  }
};
