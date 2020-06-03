const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  roomId: { type : mongoose.Schema.Types.ObjectId, ref: "Room"},
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  status: { type: Number, default: 0},
  accepted: {type: Boolean, default: false},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
});

module.exports = mongoose.model('Reservation', reservationSchema);