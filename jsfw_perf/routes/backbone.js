var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	res.sendFile(path.join(__dirname, '../public', 'backbone.html'))
});

module.exports = router;
