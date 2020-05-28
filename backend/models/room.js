const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const roomSchema = mongoose.Schema({
  address: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  zipCode: { type: String, required: true },
  createdOn: { type: Date, required: true },
  type:{type: String,required:true},
  facility: {type: Number, default: 0},
  commodity: {type: Number, default: 0},
  status: {type: Number, default: 0},
  hostId:{ type : mongoose.Schema.Types.ObjectId, ref: "User"}

});
module.exports = mongoose.model('Room', roomSchema);

/*
  Facilities:

  1: Eau courante
  2: transports en commun
  4: Climatisation
  8: Parking
  16
  32
  64
  etc.

 */
