var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var User = require('../models/recipe');
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
router.get('/new', authenticate, function(req, res, next) {
  var recipe = {
    food: '',
    snack: '',
    cookingMethod: ''
  };
  res.render('recipes/new', { recipe: recipe, message: req.flash() });
});

//SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var recipe = Recipe.findOne({_id: req.params.id});
  //if(!Recipe) return next(makeError(res, 'Document not found', 404));
  res.render('recipes/show', { recipe: recipe, message: req.flash() });
});

//CREATE
router.post('/', authenticate, function(req, res, next) {
  var user = global.currentUser;
  var recipe = new Recipe({
    food: req.body.food,
    snack: req.body.snack,
    cookingMethod: req.body.cookingMethod
  });
  user.recipes.push(recipe);
  //console.log(user.recipes);
  recipe.user = user.id;

  recipe.save()
  .then(function() {
    res.redirect('/recipes');
    //next();
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
