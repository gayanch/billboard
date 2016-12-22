var express = require('express');
var router = express.Router();

var db = require('../db/mdb.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.get_all_nodes(function(err, data) {
		if (err) {
			res.send('Error Occured');
		} else {
			res.render('bulk_actions_home', {data: data});
		}
	})
});

module.exports = router;
