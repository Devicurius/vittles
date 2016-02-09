var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');

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
}

//INDEX
router.get('/', function(req, res, next) {
  res.render('recipes/index', { recipes: recipes });
});

//NEW
router.get('/new', function(req, res, next) {
  var recipe = {
    food: '',
    snack: '',
    cookingMethod: ''
  };
  res.render('recipes/new', { recipe: recipe });
});

//CREATE
router.post('/', function(req, res, next) {
  var recipe = {
    food: req.body.food,
    snack: req.body.snack,
    cookingMethod: req.body.cookingMethod
  };

  console.log(recipe)
  .then(function() {
    res.redirect('/recipes');
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
