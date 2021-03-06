var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vittles & Drinks', message: req.flash() });  // add the message
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.jade', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/users/:id',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.jade', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/users/:id',
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

router.get('/about', function(req, res, next) {
  res.render('about');
});

// // Restricted page
// router.get('/secret', function(req, res, next) {
//   if (currentUser) {
//     res.render('secret.ejs');
//   }
//   else {
//     res.redirect('/');
//   }
// });

module.exports = router;
