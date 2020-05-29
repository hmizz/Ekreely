const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  phoneNumber: {type: String,required: true},
  status: { type: Number, default: 0, required: true},
  accesslevel:{ type: Number, default: 0, required: true}
});

module.exports = mongoose.model('User', userSchema);

