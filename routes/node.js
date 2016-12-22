var express = require('express');
var router = express.Router();

var http = require('http');

var db = require('../db/mdb');

/* GET home page. */
router.post('/register', function(req, res, next) {
	var data = {node_id: 			req.body.node_id,
		node_ip: 					req.body.node_ip,
		node_location_city: 		req.body.node_location_city,
		node_location_country:		req.body.node_location_country,
	};
	db.register_node(data, function(err, msg) {
		res.send(msg);
	});
});

router.get('/register', function(req, res, next) {
	res.render('node_register');
});

router.get('/:node_id/upload', function(req, res, next) {
	db.get_node(req.params['node_id'], function(err, data) {
		res.render('node_upload', {data: data[0]});
	});
});

router.get('/:node_id/upload-cms', function(req, res, next) {
	//console.log(req.get('host'));
	var node_id = req.params['node_id'];

	var host = 'http://' + req.get('host'); // <- uncomment this when deploying to production
	console.log(req.get('host'));
	//var host = 'http://192.168.8.100:3000';	// <- comment this when deploying to production
	db.get('files', null, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			//console.log(data);
			db.get_node(node_id, function(err, node) {
				res.render('node_upload_from_cms', {data: data, node_id: node_id, node: node[0], host: host});
			});
		}
	});
});

// //shared function (stats, info)
// function get_stats(node_id, callback) {
// 	db.get_node(node_id, (err, data) => {
// 		if (data.length > 0) {
// 			node = data[0];
//
// 			http.get(node.node_ip + '/ping', function(response) {
// 				node['status'] = 'Online';
// 				callback(node);
// 			}).on('error', (e) => {
// 				node['status'] = 'Offline';
// 				callback(node);
// 			});
// 		} else {
// 			callback(null);
// 		}
// 	});
// }
// //end: shared function

router.get('/:node_id/status', function(req, res, next) {
	node_id = req.params['node_id'];
	db.get_node(node_id, function (err, data) {
		if (data.length > 0) {
			node = data[0];
			var headersSent = false;

			var request = http.get(node.node_ip + '/ping', function(response) {
				console.log('online');
				headersSent = true;
				res.send('Online');
			}).on('error', function (e) {
				console.log('offline ' + e);
				headersSent = true;
				res.send('Offline');
			});

			request.setTimeout(7500, function() {
				if(!headersSent) {
					res.send('Offline');

				}
				console.log('timed out' + headersSent);
			});
		} else {
			console.log('offline');
			res.send('Offline');
		}
	});
});

router.get('/:node_id/delete', function(req, res, next) {
	node_id = req.params['node_id'];
	db.delete_node(node_id, function(err, msg) {
		res.send(msg);
	});
});

router.get('/:node_id/edit', function(req, res, next) {
    var node_id = req.params['node_id'];
    db.get_node(node_id, function(err, data) {
        if (err) {
            res.send('Error Occured');
        } else {
            res.render('node_edit', {data: data[0]});
        }
    });
});

router.post('/:node_id/edit', function(req, res, next) {
    res.send('ok');
});

// router.get('/:node_id/info', function(req, res, next) {
// 	node_id = req.params['node_id'];
// 	get_stats(node_id, function(data) {
// 		res.render('node_info', {data: data})
// 	});
// });

module.exports = router;
