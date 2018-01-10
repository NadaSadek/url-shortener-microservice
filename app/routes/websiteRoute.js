// main route module
'use strict';

const
      websiteController = require('../controllers/websiteController'),
      express = require('express'),
      router = express.Router();


router.get('/', (req,res) => res.render('index'));


router.get('/create/*', websiteController.generate_tiny_url);


router.get('/:tiny', websiteController.get_original_url);


module.exports = router;
