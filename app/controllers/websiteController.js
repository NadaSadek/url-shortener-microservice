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
  if(urlValidator(postURL)){
    const websiteDocument = new websiteModel({
      original: postURL,
      tiny: RandomId
    });
    console.log('websiteDocument ', websiteDocument);
  	return websiteDocument.save()
      .then(() => {
        console.log('mongoose -> successfully saved');
        const websiteJson = {original: websiteDocument.original, tiny: req.headers.host + '/' + websiteDocument.tiny};
        console.log('Saved!', websiteDocument);
        console.log('websiteJson', websiteJson);
        res.json(websiteJson);
        // res.render('index', {
        //   'result': [websiteJson]
        // });
      })
      .catch(err => {
        if(err.code === 11000) {
          console.log('err code', err.code);
          return websiteModel.getDocument({original: postURL})
            .then((website) => {
              console.log('xxx', website);
              const websiteJson = {original: website.original, tiny: req.headers.host + '/' + website.tiny};
              res.json(websiteJson);
              // res.render('index', {
              //   'result': [{original: postURL, tiny: res.headers.host + '/' + website.tiny}]
              // });
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
      console.log('get_orignial_url ', website);
      res.redirect(website.original);
    })
    .catch((err) => res.status(500).json({error: err}));
  }
  catch(e){
    console.log('e ',e);
  }
};
