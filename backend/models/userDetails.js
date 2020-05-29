const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const userDetail = mongoose.Schema({
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true},
  address: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  zipCode: { type: String, required: true },
  createdOn: { type: Date, required: true },
  modifiedOn: { type: Date, required: true },
  lastAccessed: { type: Date, required: true },
  user:[
    {type: Schema.Types.ObjectId, ref: 'user'}
  ]
});


module.exports = mongoose.model('UserDetail', userDetail);





