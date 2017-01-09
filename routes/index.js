var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Billboard Management System - Dashboard', level: req.session.level});
});

module.exports = router;
