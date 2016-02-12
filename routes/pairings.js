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

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  Pairing.findOne({_id: req.params.id})
  .then(function(pairing) {
    res.render('pairings/edit', { pairing: pairing, message: req.flash() });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  console.log('!!!!!!!!!!!!!!!!!!!!YES');
  console.log('@@@@@@@Current User Pairing Index:',currentUser.pairings.indexOf(pairing._id));
  Pairing.findOne({_id: req.params.id})
  //if(!pairing) return next(makeError(res, 'Document not found', 404));
  //else {
    .then(function(found) {
      console.log('^^^^^^^^^^^^^Pairing being updated ^^^^^^^^^')
      found.food = req.body.food;
      found.drink = req.body.drink;
      found.update()
    .then(function(pairing) {
      var p = pairing;
      currentUser.pairings.indexOf(pairing._id)
    .then(function(userPairing) {
      currentUser.pairings[userPairing] = pairing;
      currentUser.save()
      return('^^^^^^^^^^^Current User Saved^^^^^^^^^^^^')
    .then(function(saved) {
      res.redirect('/pairings');
    }, function(err) {
      return next(err);
    });
  });
  });
  });
  //}
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  console.log('###################');
  var pairing = req.params.id;
  console.log('!!!!!!!!!!!!!!!!', pairing);
  if (!pairing) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.pairings.indexOf(pairing._id);
  currentUser.pairings.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/pairings');
  }, function(err) {
    return next(err);
  });
});


  // var pairing = currentUser.pairings.id(req.params.id);
  // console.log('@@@@@@@@@@@@@@@@@@@',pairing);
  // if (!pairing) return next(makeError(res, 'Document not found', 404));
  // var index = currentUser.pairings.indexOf(pairing);
  // currentUser.pairings.splice(index, 1);
  // currentUser.save()
  // .then(function(saved) {
  //   res.redirect('/pairings');
  // }, function(err) {
  //   return next(err);
  // });


module.exports = router;
