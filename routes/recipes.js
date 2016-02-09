var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
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
  console.log('you reached the root route for recipes.');
  // var user = global.currentUser;

  // var recipes = global.currentUser.recipes.populate('recipes')
  Recipe.find({'_id': { $in: global.currentUser.recipes} })
  // User.findById(global.currentUser._id).populate("recipes")
  .then(function(recipes){
    // var recipe = User.find({recipe: "meat"});
    // console.log('$$$$$$$$ user.recipes from the index: ' + recipes);
    res.render('recipes/index', {recipes: recipes, message:req.flash() });
  }, function(err) {
    return next(err);
  });
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
  Recipe.findOne({_id: req.params.id})
  //if(!Recipe) return next(makeError(res, 'Document not found', 404));
  .then(function(recipe) {
    res.render('recipes/show', { recipe: recipe, message: req.flash() });
  }, function(err) {
    return next(err);
  });
});

//CREATE
router.post('/', authenticate, function(req, res, next) {
  var user = global.currentUser;
  var recipe = new Recipe({
    food: req.body.food,
    drank: req.body.drank,
  });
  //user.recipes.push(recipe);
  //console.log(user.recipes);
  recipe.user = user.id;
  recipe.save()
  .then(function(savedRecipe) {
    user.recipes.push(savedRecipe);
    return user.save();
  })
  .then(function(savedUser) {
    res.redirect('/recipes');
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
