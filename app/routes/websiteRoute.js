// main route module
'use strict';


const express = require('express');
const router = express.Router();

const websiteController = require('../controllers/websiteController');

router.get('/', (req,res) => {
  console.log('homepage');
	res.render('index');
});


router.get('/create/:url', websiteController.generate_tiny_url);


router.get('/:tinyUrl', websiteController.get_original_url);


module.exports = router;
