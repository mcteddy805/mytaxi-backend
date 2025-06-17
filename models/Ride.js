const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  driver: String,
  pickupLocation: String,
  dropoffLocation: String,
  fare: Number,
  isCompleted: Boolean,
});

module.exports = mongoose.model('Ride', RideSchema);
