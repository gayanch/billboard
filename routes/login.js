var express = require('express');
var router = express.Router();

var db = require('../db/mdb');

/* GET home page. */
router.post('/', function(req, res, next) {
    //req.session.login = true;
  	username = req.body.username;
    password = req.body.password;

    db.auth_user(username, password, function(err, data) {
        if (err) {
            var ok_res = "Login Failed!";

            res.send(ok_res);
        } else {
            req.session.login = true;
            req.session.level = data;
            console.log(data);
            var ok_res = "Login Success!" +
                "<script>"+
                "setTimeout(function() {" +
                "parent.location.href='/';" +
                "}, 1000)"+
                "</script>";

            res.send(ok_res);
        }
    });



});

router.get('/logout', function(req, res, next) {
    req.session.login = false;
    res.redirect('/');
});

module.exports = router;
