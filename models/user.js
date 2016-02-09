var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Recipe = require('./recipe');

var UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
    // twitter_handle: String,
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
