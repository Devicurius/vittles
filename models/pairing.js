var mongoose = require('mongoose');

var PairingSchema = mongoose.Schema({
  food: String,
  drink: String,
  image1: String,
  image2: String,
  image3: String,

  // USER REFERENCE
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Pairing', PairingSchema);
