const mongoose = require("mongoose");

const userDetails = mongoose.Schema({

    firstName: {type: String},
    lastName: {type: String},
    gender: {type: String},
    doBirth: {type: String},
    fromCountry: {type: String},
    fromRegion: {type: String},
    created_on:{type: Date},
    modified_on: {type: Date},
    last_accessed : {type: String},

    user: { userId : mongoose.Schema.Types.ObjectId, ref: "User"}

});

module.exports = mongoose.model('UserDetails', userDetails);
