var mongoose = require('mongoose');

var RecipeSchema = mongoose.Schema({
  recipeName: String,
  lorem: String,
  ingredients: String,
  instructions: String,
  food: String,
  snack: String,
  cookingMethod: String,

  // // PAGE ELEMENTS INDEPENDENT OF USER CHOICES
  // stylesheet: String,
  // blogTitle: String,
  // writer: String,
  // writerImage: String,
  // writerBio: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
