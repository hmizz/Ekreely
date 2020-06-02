const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const roomSchema = mongoose.Schema({
  title: {type: String, required: true},
  type: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  zipCode: { type: String},
  createdOn: { type: Date, required: true },
  facility: { type: Number, default: 0 },
  commodity: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true },
  host: {type: {
    hostName: String,
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }},
  },
  verified: {type: Boolean,default: false, required: true}  
});

module.exports = mongoose.model("Room", roomSchema);

/*
  Facilities:

  1: Eau courante
  2: transports en commun
  4: Climatisation
  8: Parking
  16:
  32
  64
  etc.
 */
