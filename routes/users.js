var express = require('express');
var router = express.Router();

var db = require('../db/mdb');

function check_privilages(req) {
    if (req.session.level == 'admin') {
        return true;
    }
    return false;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!check_privilages(req)) {
        res.redirect('../');
        return
    }

    db.get_user_list(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            res.render('user_management', {data: data});
        }
    });

});

router.post('/update', function(req, res, next) {
    if (!check_privilages(req)) {
        res.redirect('../');
        return
    }

    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var level = req.body.level;

    db.update_user(id, username, password, level, function(err, result) {
        if (err)
            res.send("Sorry! Error Occured. " + err);
        else
            res.send("Update Successfull");
    });
});

router.post('/delete', function(req, res, next) {
    if (!check_privilages(req)) {
        res.redirect('../');
        return
    }

    var id = req.body.id;

    db.delete_user(id, function(err, result) {
        if (err) {
            res.send('Error occured: ' + err);
        } else {
            res.send('Delete Successfull');
        }
    });
})

router.post('/new', function(req, res, next) {
    if (!check_privilages(req)) {
        res.redirect('../');
        return
    }
    
    db.add_new_user(req.body.username, req.body.password, req.body.level, function(err, result) {
        res.send(result);
    });
});

module.exports = router;
