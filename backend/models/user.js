// mongoose models

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = mongoose.Schema({
  namee: {type: String, unique: true},
  phoneNumber: {type: String},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  status: {type: Number, min:0, max : 3,default: 0},
  accessLevel : {type: Number, min: 0, max: 3, default: 0}

});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User",userSchema);
