var express = require('express');
var router = express.Router();

var http = require('http');

var db = require('../db/mdb');

/* GET home page. */
router.get('/connected', function(req, res, next) {
    db.get_all_nodes(function(err, data) {
        retArray = [];
        retIndex = 0;
        processed = 0;

        data.forEach(function(item) {
            http.get(item.node_ip, function(response) {
                response.on('end', function() {
                    retArray[retIndex] = item;
                    retIndex++;

                    if (processed == data.length -1) {
                        console.log(retArray);
                        res.render('connected_nodes', {data: retArray});
                    }
                    processed++;
                });
            }).on('error', function(e)  {
                if (processed == data.length -1) {
                    console.log(retArray);
                    res.render('connected_nodes', {data: retArray});
                }
                processed++;
            });
        });

        // res.render('connected_nodes', {data: data});
        // for (var i=0; i<data.length; i++) {
        //
        // }
        // var ret= [];
        // var retIndex = 0;

        // if (err) {
        //     res.send('Error Occured.');
        // } else {
        //     // res.send(data[0]['stats']['status']);
        //     for (var i=0; i<data.length; i++) {
        //
        //
        //         http.get(data[i].node_ip + '/ping', function(response) {
        //             console.log(data[i].node_ip);
        //             ret[retIndex] = data[i];
        //             retIndex++;
        //         }).on('error', function(err) {
        //             console.log(data[i].node_ip);
        //         });
        //     }
        //     console.log(ret);

            // res.render('connected_nodes', {data: ret});
            // res.send("No Nodes found");
        // }
    });
});

router.get('/all', function(req, res, next) {
    // res.render('nodes_all');
    db.get_all_nodes(function(err, data) {
        res.render('nodes_all', {data: data});
        //res.send(data);
    });
});

module.exports = router;
