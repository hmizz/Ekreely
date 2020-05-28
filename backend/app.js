const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const roomRoutes = require('./routes/admin/room');
const userRoutes = require('./routes/admin/user');
const usersRoutes = require('./routes/user/users');
const roomsRoutes = require('./routes/user/rooms');

mongoose.connect('mongodb://localhost:27017/AppData')
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(() => {
    console.log('Failed to connect to DB');
  });

const app = express();
app.use(bodyParser.json());

//Allows headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use("/api/room", roomRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app; //exports the app and all of its properties