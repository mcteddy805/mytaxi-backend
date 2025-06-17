const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Ride = require('./models/Ride');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a ride
app.post('/rides', async (req, res) => {
  const ride = new Ride(req.body);
  await ride.save();
  res.send(ride);
});

// Get all rides
app.get('/rides', async (req, res) => {
  const rides = await Ride.find();
  res.send(rides);
});

// Update ride
app.put('/rides/:id', async (req, res) => {
  const updated = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// Delete ride
app.delete('/rides/:id', async (req, res) => {
  await Ride.findByIdAndDelete(req.params.id);
  res.send({ message: 'Ride deleted' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
