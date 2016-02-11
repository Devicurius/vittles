var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Pairing = require('./pairing');

var UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
    // twitter_handle: String,
  },
  pairings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pairing'
  }]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
