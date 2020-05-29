const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true},
  encryptedPwd: { type: String, required: true},
  status: { type: Number, default: 0, required: true}
})

module.exports = mongoose.model('UserSchema', userSchema);

