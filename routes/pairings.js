var express = require('express');
var router = express.Router();
var Pairing = require('../models/pairing');
var User = require('../models/user');
var mongoose = require('mongoose');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
};

//INDEX
router.get('/', authenticate, function(req, res, next) {
  console.log('you reached the root route for pairings.');
  // var user = global.currentUser;

  // var pairings = global.currentUser.pairings.populate('pairings')
  Pairing.find({'_id': { $in: global.currentUser.pairings} })
  // User.findById(global.currentUser._id).populate("pairings")
  .then(function(pairings){
    // var pairing = User.find({pairing: "meat"});
    console.log('$$$$$$$$ user.pairings from the index: ' + pairings);
    res.render('pairings/index-alt', {pairings: pairings, message:req.flash() });
  }, function(err) {
    return next(err);
  });
});

//NEW
router.get('/new', authenticate, function(req, res, next) {
  var pairing = {
    food: '',
    snack: '',
    cookingMethod: ''
  };
  res.render('pairings/new', { pairing: pairing, message: req.flash() });
});

//SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Pairing.findOne({_id: req.params.id})
  //if(!Pairing) return next(makeError(res, 'Document not found', 404));
  .then(function(pairing) {
    res.render('pairings/show', { pairing: pairing, message: req.flash() });
  }, function(err) {
    return next(err);
  });
});

//CREATE
router.post('/', authenticate, function(req, res, next) {
  var user = global.currentUser;
  var pairing = new Pairing({
    food: req.body.food,
    drink: req.body.drink,
  });
  //user.pairings.push(pairing);
  //console.log(user.pairings);
  pairing.user = user.id;
  pairing.save()
  .then(function(savedPairing) {
    user.pairings.push(savedPairing);
    return user.save();
  })
  .then(function(savedUser) {
    res.redirect('/pairings');
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
