(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('PersonalAppDb', ['balance']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/balance', function(req, res) {
    db.balance.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/balance', function(req, res) {
    db.balance.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

  router.put('/api/balance', function(req, res) {
    var id = req.body._id;
    var balanceEur = req.body.euros;
    var balanceMkd = req.body.denars;

   db.balance.update({
     _id: mongojs.ObjectId(id)
   }, {
     euros: balanceEur,
     denars: balanceMkd
   }, {}, function(err, data) {
     res.json(data);
   });

 });
  router.delete('/api/balance/:_id', function(req, res) {
    db.balance.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });

  module.exports = router;

}());
