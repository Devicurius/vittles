var express = require('express');
var router = express.Router();
var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

//Dashboard
router.get('/', function(req, res, next) {
  res.render('users/show');
});

//Edit Profile
router.get('/:id/edit', function(req, res, next) {
  res.render('users/edit');
});

//Update Profile
router.put('/:id', function(req, res, next) {
  var user = User.id(req.params.id);
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
  var user = User.id(req.params.id);
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
