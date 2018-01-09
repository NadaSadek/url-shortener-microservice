// main route module
'use strict';

const
      WebsiteController = require('../controllers/websiteController'),
      express = require('express'),
      router = express.Router();


router.get('/', (req,res) => {
  console.log('homepage');
	res.render('index');
});


router.get('/create/:url', WebsiteController.generate_tiny_url);


router.get('/:tiny', WebsiteController.get_original_url);


module.exports = router;
