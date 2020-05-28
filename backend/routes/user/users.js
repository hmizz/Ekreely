const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      fullName: req.body.fullname,
      email: req.body.email,
      password: hash,
      accessLevel: 0,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log(error);
        return res.status(401).json({
          message: "Auth failed!!",
        });
      }
      fetchedUser = user;
      console.log(user);
      return bcrypt.compare(req.body.password, fetchedUser.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Aauth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "invalid authentication credentials!",
      });
    });
});

module.exports = router;
