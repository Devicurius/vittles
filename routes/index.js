var express = require('express');
var router = express.Router();
var passport = require('passport');

//INDEX
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vittles & Dranks' });
});

//Passport Signup
router.get('/signup', function(req, res, next) {
  res.render('signup.jade', { message: req.flash() });
});

router.post('/signup', function(req, res, next) {
  var signUp = passport.authenticate('local-signup', {
    successRedirect : '/users/:id', //redirect to dashboard
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signUp(req, res, next);
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/recipes',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
