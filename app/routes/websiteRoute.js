/*jslint node: true */


'use strict';

const
      websiteController = require('../controllers/websiteController'),
      express = require('express'),
      router = express.Router();


router.get('/', websiteController.open_homepage);


router.post('/*', websiteController.generate_tiny_url);


router.get('/:tiny', websiteController.get_original_url);


module.exports = router;
