const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  roomId: { type : mongoose.Schema.Types.ObjectId, ref: "Room"},
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  status: { type: Number, default: 0},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
});

module.exports = mongoose.model('User', userSchema);