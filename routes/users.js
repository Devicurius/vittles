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
};

//Index
router.get('/', authenticate, function(req, res, next) {
  res.redirect('/');
});

//Edit Profile
// router.get('/:id/edit', authenticate, function(req, res, next) {
//   console.log('-----------EDIT VIEW-----------');
//   console.log('----------USER:',global.currentUser +'------------');
//   var user = global.currentUser;
//   var update = req.body.username;
//   console.log('!!!!!!!!!!!!', update);
//   res.render('users/edit', { user: user });
// });

// //Update Profile
// router.put('/:id', authenticate, function(req, res, next) {
//   console.log('--------PUT----------');
//   var update = req.params.id;
//   //if(!update) return next(makeError(res, 'Document NOT found', 404));
//  // else {
//     console.log('UPDATE ~~~~~~~~~',update);
//     user.username = req.body.username;
//     global.currentUser.save()
//     .then(function(saved) {
//       res.redirect('/users/show');
//     }, function(err) {
//       return next(err);
//     });
//   //}
// });

//Dashboard
router.get('/:id', authenticate, function(req, res, next) {
  var user = global.currentUser.id;
  res.render('users/show', { user: user });
});

//Delete Profile
// router.delete('/:id', authenticate, function(req, res, next) {
//   var user = global.currentUser(req.params.id);
//   if(!user) return next(makeError(res, 'Document not found', 404));
//   else {
//     user.delete()
//     .then(function(saved) {
//       res.redirect('/');
//     }, function(err) {
//       return next(err);
//     });
//   }
// });

module.exports = router;
