(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('PersonalAppDb', ['transactions']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/transactions', function(req, res) {
    db.transactions.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/transactions', function(req, res) {
    db.transactions.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

  router.put('/api/transactions', function(req, res) {

    db.transactions.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      transaction: req.body.transaction
    }, {}, function(err, data) {
      res.json(data);
    });

  });

  router.delete('/api/transactions/:_id', function(req, res) {
    db.transactions.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });

  module.exports = router;

}());
