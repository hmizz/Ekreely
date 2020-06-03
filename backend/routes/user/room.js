const express = require("express");
const Room = require("../../models/room");
const Reservation = require("../../models/reservation");
const checkAuth = require("../../middleware/authenticator");

const router = express.Router();

router.post("",(req, res, next) => {
  console.log(req.body);
    const room = new Room({
      title:req.body.title,
      type: req.body.type,
      address: req.body.address,
      country: "Tunisia",
      region: req.body.region,
      zipCode: "null",
      createdOn: new Date(),
      facility: 0,
      commodity: 0,
      status: 0,
      description: req.body.description,
      pricePerNight: req.body.pricePerNight,
      capacity: req.body.capacity,
      host: null
    });
    room.save()
      .then((createdRoom) => {
        console.log(createdRoom);
        res.status(201).json({
          message: "Room added successfully ",
          roomId: createdRoom._id,
          
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "creating a Room failed",
        });
      });
  }
);
//middleware
// (/:id)
router.put("/:id", checkAuth, (req, res, next) => {
  const room = new Room({
    _id: req.body.id,
    title: req.body.title,
    cocntent: req.body.content,
    creator: req.userData.userId,
  });
  Room.updateOne({ _id: req.params.id, creator: req.userData.userId }, room)
    .then((result) => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "update successful!" });
      } else {
        res.status(401).json({ message: "not authorized!!!!!!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "couldn't update Room!",
      });
    });
});
// ('')
router.get("", (req, res, next) => {
  Room.find().then((documents) => {
    res.status(200).json({
      message: "success",
      rooms: documents,
    });
  });
});
router.get("/myrooms/:id", (req, res, next) => {
  Room.find({ hostId: req.params.id}).then((documents) => {
    res.status(200).json({
      message: "success",
      rooms: documents,
    });
  });
});

router.patch("", (req, res, next) => {
  Room.find({
    region: req.body.region
  }).then((documents) => {
    res.status(200).json({
      message: "success",
      rooms: documents,
    });
    console.log(documents);
  });
});
// (/:id)
router.get("/:id", (req, res, next) => {
  Room.findById(req.params.id).then((Room) => {
    if (Room) {
      res.status(200).json(Room);
    } else {
      res.status(404).json({ message: "Room not found!" });
    }
  });
});
// ("/:id")
router.delete("/:id", checkAuth, (req, res, next) => {
  Room.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "deleted successfully!!" });
      } else {
        res.status(401).json({ message: "not authorized!!!!!!" });
      }
    }
  );
});

module.exports = router;
