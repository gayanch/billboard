var express = require('express');
var fs = require('fs');
var db = require('../db/mdb');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cms_home');
});

router.get('/all-files', function(req, res, next) {
    db.get_saved_files(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.render('cms_all_files', {data: data});
        }
    });
});

//file uploads to cms
router.get('/upload', function(req, res, next) {
	res.render('cms_upload');
});

router.post('/upload', function(req, res, next) {
    var title = req.body.title;
    var category = req.body.category;
    var file = req.files.file;
    var save_to = __dirname + '/../public/cms_files/' + file.name;

    file.mv(save_to, function(err) {
        if (err) {
            res.send('Error Uploading File: ' + file.name);
        } else {
            var data = {name: file.name, title: title, size: file.data.length, category: category, date: new Date()};
            db.save_file_data(data, function(err, ret) {
                res.send('File Uploaded: ' + file.name);
            });
        }
    });
});
//end file upload functions

// router.post('/file/:file_id/upload/:node_id', function(req, res, next) {
//     var file_id = req.params['file_id'];
//     var node_id = req.params['node_id'];
//
//     res.send("File Uploaded to " + node_id);
// });

router.all('/file/:file_id/upload', function(req, res, next) {
    var file_id = req.params['file_id'];
    console.log(file_id);
    db.get('nodes', null, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            db.get_file(file_id, function(err, file) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(file);
                    var file_url = 'http://' + req.get('host') + '/cms_files/' + file.name;
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    res.render('cms_upload_to_node', {data: data, file_id: file_id, file_url: file_url});
                }
            });
        }
    })
});

router.get('/:file_id/delete', function(req, res, next) {
    var file_id = req.params['file_id'];
    var filename = req.query.filename;
    console.log(filename);
    db.delete_file(file_id, function(err, data) {
        if (err) {
            res.send("Error Occured");
        } else {
            fs.unlink('../public/cms_files/' + filename, function() {
                res.send('File Deleted.');
            });
        }
    });
});

//file uploads to node
// router.post('file/:file_id/upload/:node_id', function(req, res, next) {
//     var file_id = req.params['file_id'];
//     var node_id = req.params['node_id'];
//
//     res.send('ok');
// });

module.exports = router;
