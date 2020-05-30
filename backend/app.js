const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const roomRoutes = require('./routes/admin/room/room');
const userRoutes = require('./routes/admin/user/user');
const usersRoutes = require('./routes/user/user');
const roomsRoutes = require('./routes/user/room');

const app = express();

mongoose
  .connect(
    "mongodb+srv://Admin:azerty1234@ekreely-ss2r6.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS "
  );
  next();
});

app.use("/api/room", roomsRoutes);
app.use("/api/user", usersRoutes);

module.exports = app;
