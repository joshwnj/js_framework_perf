var fs = require('fs');
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
	fs.readFile(path.join(__dirname, '../public', 'javascripts', 'angular.app.js'), 'utf-8', function(err, data){
  		res.render('angular', { title: 'Angular - Performance Evaluation', code : data });
	});
});

module.exports = router;
