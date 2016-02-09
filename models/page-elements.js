var mongoose = require('mongoose');

var PageElementsSchema = mongoose.Schema({
  // PAGE ELEMENTS DEPENDENT UPON USER CHOICES
  food: {type: Array, default: []},
  // foodImage: {type: Array, default: []},
  snack: {type: Array, default: []},
  // snackImage: {type: Array, default: []},
  cookMethod: {type: Array, default: []},
  lorem: {type: Array, default: []},
  // // PAGE ELEMENTS INDEPENDENT OF USER CHOICES
  // stylesheet: {type: Array, default: []},
  // blogTitle: {type: Array, default: []},
  // writer: {type: Array, default: []},
  // writerImage: {type: Array, default: []},
  // writerBio: {type: Array, default: []}
});

module.exports = mongoose.model('PageElements', PageElementsSchema);
