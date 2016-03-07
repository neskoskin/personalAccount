(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('PersonalAppDb', ['transactions']);
  var APP_CONFIG = {
   "mongo": {
      "hostString": "mongodb:27017/9c77e7c51b283e4a9c2e58a79be3ad70",
      "user": "9c77e7c51b283e4a9c2e58a79be3ad70",
      "db": "9c77e7c51b283e4a9c2e58a79be3ad70"
   }
};
var config = JSON.parse(APP_CONFIG);
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(
    	"mongodb://" + config.mongo.user + ":kartagina@" +
		config.mongo.hostString,
    	function(err, db) {
            if(!err) {
                res.end("We are connected to MongoDB\n");
            } else {
                res.end("Error while connecting to MongoDB\n");
            }
    });
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/transactions', function(req, res) {
    MongoClient.transactions.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/transactions', function(req, res) {
    MongoClient.transactions.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

  router.put('/api/transactions', function(req, res) {

    MongoClient.transactions.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      transaction: req.body.transaction
    }, {}, function(err, data) {
      res.json(data);
    });

  });

  router.delete('/api/transactions/:_id', function(req, res) {
    MongoClient.transactions.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });

  module.exports = router;

}());
