
const express = require("express");
const Room = require('../models/room');
const checkAuth = require("../middleware/check-auth");


const router = express.Router();
router.post("",
  checkAuth,
 (req, res, next) => {
    const Room = new Room({
      title: req.body.title,
      content: req.body.content,
      creator: req.userData.userId
    });
    Room.save().then(createdRoom => {
      res.status(201).json( {
          message: "Room added successfully ",
          roomId: createdRoom._id

        });
    })
    .catch(error => {
      res.status(500).json({
        message:"creating a Room failed"
      });
    });
  });
  //middleware
  // (/:id)
  router.put("/:id", checkAuth,
  (req, res, next) => {
    const room = new Room({
      _id: req.body.id,
      title: req.body.title,
      cocntent: req.body.content,
      creator: req.userData.userId
    });
    Room.updateOne({_id: req.params.id, creator: req.userData.userId }, room).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({message: "update successful!" });
      }else {
        res.status(401).json({message: "not authorized!!!!!!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message:"couldn't update Room!"
      });
    });
  });
  // ('')
  router.get('',(req,res, next) => {
    Room.find().then(documents => {
      res.status(200).json({
        Rooms: documents
      });
     });
   });
   // (/:id)
   router.get("/:id", (req, res, next) => {
     Room.findById(req.params.id).then(Room => {
       if(Room) {
        res.status(200).json(Room);
       } else {
         res.status(404).json({message: 'Room not found!'});
       }
     });
   });
   // ("/:id")
   router.delete("/:id", checkAuth, (req, res, next) => {
    Room.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
      if (result.n > 0) {
        res.status(200).json({message: "deleted successfully!!" });

      }else {
        res.status(401).json({message: "not authorized!!!!!!" });

      }
    });
  });

  module.exports = router;
