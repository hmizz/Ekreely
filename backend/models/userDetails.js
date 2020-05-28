const mongoose = require('mongoose');
const User = require("./user");

const userDetails = mongoose.Schema({
  
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true},
  address: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  zipCode: { type: String, required: true },
  createdOn: { type: Date, required: true },
  modifiedOn: { type: Date, required: true },
  lastAccessed: { type: Date, required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
});

module.exports = mongoose.model('UserDetails', userDetails);





