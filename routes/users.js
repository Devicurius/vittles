var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

//Index
router.get('/', authenticate, function(req, res, next) {
  res.redirect('/');
});

//Dashboard
router.get('/:id', authenticate, function(req, res, next) {
  var user = users.id(req.params.id);
  res.render('users/show');
});

//Edit Profile
router.get('/:id', authenticate, function(req, res, next) {
  var user = global.currentUser.id(req.params.id);
  res.render('users/edit');
});

//Update Profile
router.put('/:id', function(req, res, next) {
  var user = global.currentUser.id(req.params.id);
  if(!user) return next(makeError(res, 'Document not found', 404));
  else {
    user.save()
    .then(function(saved) {
      res.redirect('/');
    }, function(err) {
      return next(err);
    });
  }
});

//Delete Profile
router.delete('/:id', function(req, res, next) {
  var user = global.currentUser.id(req.params.id);
  if(!user) return next(makeError(res, 'Document not found', 404));
  else {
    user.delete()
    .then(function(saved) {
      res.redirect('/');
    }, function(err) {
      return next(err);
    });
  }
});

module.exports = router;
