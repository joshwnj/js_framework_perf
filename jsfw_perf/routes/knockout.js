var fs = require('fs');
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
	fs.readFile(path.join(__dirname, '../public', 'javascripts', 'knockout.app.js'), 'utf-8', function(err, data){
  		res.render('knockout', { title: 'Knockout - Performance Evaluation', code : data });
	});
});

module.exports = router;
