/*jslint node: true */
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

exports.open_homepage = (req,res) => res.render('index');

exports.generate_tiny_url = (req, res) => {

  const RandomId = Math.floor(Math.random() * (9000 - 1) + 1);
  const postURL = req.body.url;
  console.log(postURL);
  if(urlValidator(postURL)){
    const websiteDocument = new websiteModel({
      original: postURL,
      tiny: RandomId
    });
  	return websiteDocument.save()
      .then((website) => {
        console.log('yyc');
        res.render('index', {
          'result': [{original: website.original, tiny: res.hostname+'/'+website.tiny}]
        });
      })
      .catch((err) => {
        if(err.code === 11000) {
          return websiteModel.getDocument({original: postURL})
            .then((website) => {
              console.log('xxx', website);
              res.render('index', {
                'result': [{original: postURL, tiny: res.hostname+'/'+website.tiny}]
              });
            })
            .catch((err) => res.status(500).json({error: err}));
        }
        else res.status(500).json({error: err});
      });
  }
  else {
    res.render('index', {
      'errMessage': 'Please Provide a Valid URL!'
    });
  }
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
