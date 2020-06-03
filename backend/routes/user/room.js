const express = require("express");
const Room = require("../../models/room");
const Reservation = require("../../models/reservation");
const checkAuth = require("../../middleware/authenticator");

const router = express.Router();

router.post('',(req, res, next) => {
    const thisDate = new Date();
    const room = new Room({
      title: req.body.title,
      type: req.body.type,
      country: req.body.country,
      region: req.body.region,
      address: req.body.address,
      zipCode: req.body.zipCode,
      createdOn: req.body.createdOn,
      description: req.body.description,
      facility: req.body.facility,
      commodity: req.body.commodity,
      capacity: req.body.capacity,
      pricePerNight: req.body.pricePerNight,
      status: req.body.status,
      verified: true,
      host: null,
    });
    room
      .save()
      .then((createdRoom) => {
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

router.put('/edit/:id', (req, res, next) => {
  const newRoom = new Room({
    _id: req.body.id,
    title: req.body.title,
    type: req.body.type,
    country: req.body.country,
    region: req.body.region,
    address: req.body.address,
    zipCode: req.body.zipCode,
    createdOn: req.body.createdOn,
    description: req.body.description,
    facility: req.body.facility,
    commodity: req.body.commodity,
    capacity: req.body.capacity,
    pricePerNight: req.body.pricePerNight,
    status: req.body.status,
    verified: true,
    host: null,
  });
  Room.updateOne({_id: req.params.id}, newRoom).then( result => {
    console.log(result, newRoom);
    res.status(200).json({ message: 'Update successful',
      newRoom});
  })
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
    region: req.body.city,
    capacity: { $gte: req.body.capacity },
  }).then((documents) => {
    res.status(200).json({
      message: "success",
      rooms: documents,
    });
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
