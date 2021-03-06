const express = require('express');

const router = express.Router();


const authenticator = require('../../../middleware/authenticator');
const DBRoom = require('../../../models/room');


router.put('/edit/:id', (req, res, next) => {
    const newRoom = new DBRoom({
        _id: req.body.id,
        type: req.body.type,
        address: req.body.address,
        country: req.body.country,
        region: req.body.region,
        zipCode: req.body.zipCode,
        createdOn: req.body.createdOn,
        facility: req.body.facility,
        commodity: req.body.commodity,
        status: req.body.status,
        owner: req.body.owner
    });
    DBRoom.updateOne({_id: req.params.id}, newRoom).then( result => {
      console.log(result, newRoom);
      res.status(200).json({ message: 'Update successful',
        newRoom});
    })
  });
  

  router.get('', (req, res, next) => {
    DBRoom.find().then(data => {
      res.status(200).json({
            roomsList: data
      })
    });
  });


  router.delete('/delete/:id', authenticator, (req, res, next) => {
    DBRoom.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'User deleted successfully!'});
    });
  });
  
  
  module.exports = router;
  
  