var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectId;

var url = 'mongodb://localhost:27017/billboard';
//var url = 'mongodb://bbuser:agc1803793@ds061676.mlab.com:61676/billboard';

//functions for 'node' endpoint
function register_node(data, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('nodes');
			collection.insertOne(data, function(err, res) {
				if (err) {
					if (err.code = 11000) {
						callback(err, 'Invalid Node ID. Try with different one.');
					} else {
						callback(err, 'Can\'t register the node, errcode: ' + err.code);
					}
				} else {
					callback(null, 'Node registered successfully.');
				}
			});
		}
	});
}

function get_node(node_id, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('nodes');
			collection.find({node_id: node_id}).toArray(function(err, res) {
				if (err) {
					callback(err, 'Can\'t find nodes. errcode: ' + err.errcode);
				} else {
					callback(null, res);
				}
			});
		}
	});
}

function delete_node(node_id, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('nodes');
			collection.deleteOne({node_id: node_id}, function(err) {
				if (err) {
					callback(err, 'Delete Failed');
				} else {
					callback(null, node_id + ' Deleted.');
				}
			});
		}
	});
}

//end of functions for 'node' endpoint

//functions for 'nodes' endpoint
function get_all_nodes(callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('nodes');
			collection.find().toArray(function(err, res) {
				if (err) {
					callback(err, 'Can\'t find nodes. errcode: ' + err.errcode);
				} else {
					callback(null, res);
				}
			});
		}
	});
}

function get_online_nodes(callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('nodes');
			collection.find({'stats.status': 'online'}).toArray(function(err, res) {
				if (err) {
					callback(err, 'Can\'t find nodes. errcode: ' + err.errcode);
				} else {
					callback(null, res);
				}
			});
		}
	})
}
//end of functions for 'nodes'



//file handling functions
function save_file_data(data, callback) {
	mongoClient.connect(url, function(err, db) {
		if(err) {
			callback(err, 'Can\'t connect to the server')
		} else {
			var collection = db.collection('files');
			collection.insertOne(data, function(err, res) {
				if (err) {
					callback(err, 'Save Error');
				} else {
					callback(null, 'Saved');
				}
			});
		}
	});
}

function get_saved_files(callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('files');
			collection.find().toArray(function(err, res) {
				if (err) {
					callback(err, 'Can\'t find nodes. errcode: ' + err.errcode);
				} else {
					callback(null, res);
				}
			});
		}
	});
}

function get(coll, crit, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection(coll);
			collection.find().toArray(function(err, res) {
				if (err) {
					callback(err, 'Can\'t find nodes. errcode: ' + err.errcode);
				} else {
					callback(null, res);
				}
			});
		}
	});
}

function delete_file(file_id, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('files');
			collection.deleteOne({_id: new ObjectId(file_id)}, function(err) {
				if (err) {
					callback(err, 'Delete Failed');
				} else {
					callback(null, file_id + ' Deleted.');
				}
			});
		}
	});
};

function get_file(file_id, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('files');
			collection.find({_id: new ObjectId(file_id)}).toArray(function(err, res) {
				if (err) {
					callback(err, 'Find Failed');
				} else {
					console.log(res);
					callback(null, res[0]);
				}
			});
		}
	});
}

//user management functions
function auth_user(username, password, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('users');
			collection.find({username: username, password: password}).toArray(function(err, res) {
				if (err) {
					callback(err, 'Find Failed');
				} else {
					if (res.length == 0) {
						callback('Invalid credentials.');
					} else {
						callback(null, res[0].level);
					}

				}
			});
		}
	});
}

function get_user_list(callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('users');
			collection.find().toArray(function(err, res) {
				if (err) {
					callback(err, 'Find Failed');
				} else {
					if (res.length == 0) {
						callback('No Users Found', 'No Users Found');
					} else {
						callback(null, res);
					}

				}
			});
		}
	});
}

function update_user(id, username, password, level, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('users');
			collection.update({_id: new ObjectId(id)}, {
				username: username,
				password: password,
				level: level,
			}, function(err, result) {
				callback(err, result);
			});
		}
	});
}

function delete_user(id, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			callback(err, 'Can\'t connect to the server');
		} else {
			var collection = db.collection('users');
			collection.remove({_id: new ObjectId(id)}, function(err, result) {
				callback(err, result);
			});
		}
	});
}

function add_new_user(username, password, level, callback) {
	mongoClient.connect(url, function(err, db) {
		if(err) {
			callback(err, 'Can\'t connect to the server')
		} else {
			var collection = db.collection('users');
			collection.insertOne({username: username, password: password, level: level},
				function(err, res) {

				if (err) {
					callback(err, 'Save Error');
				} else {
					callback(null, 'Saved');
				}
			});
		}
	});
}

module.exports = {
	//node
	register_node	: register_node,
	get_node		: get_node,
	delete_node: delete_node,

	//nodes
	get_all_nodes: get_all_nodes,
	get_online_nodes: get_online_nodes,

	//file handling
	save_file_data: save_file_data,
	get_saved_files: get_saved_files,
	delete_file: delete_file,
	get_file: get_file,

	//user management functions
	auth_user: auth_user,
	get_user_list: get_user_list,
	update_user: update_user,
	delete_user: delete_user,
	add_new_user: add_new_user,

	//new generic funcs
	get: get
};
