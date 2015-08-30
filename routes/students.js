var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var file = path.join(__dirname, '../models/students.json');
	fs.readFile(file, 'utf8', function (err, data) {
		if(err) {
			next(err);
		}else {
			res.json(data);
		}
	});
});

module.exports = router;
