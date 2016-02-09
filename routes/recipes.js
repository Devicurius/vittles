var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
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
}

//INDEX
router.get('/', function(req, res, next) {
  res.render('recipes/index');
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

//SHOW
router.get('/:id', function(req, res, next) {
  //var recipe = recipes.id(req.params.id);
  var recipe = "This is my recipe";
  if(!recipe) return next(makeError(res, 'Document not found', 404));
  res.render('recipes/show', { recipe: recipe });
});

//CREATE
router.post('/', function(req, res, next) {
  var recipe = new Recipe({
    food: req.body.food,
    snack: req.body.snack,
    cookingMethod: req.body.cookingMethod
  });

  console.log(recipe);
  recipe.save()
  .then(function() {
    res.redirect('/recipes');
    next();
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
