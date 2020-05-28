const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  fullName: {type:String, required:true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  accessLevel: {type: Number, default: 0, required: true},
  status: { type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);

