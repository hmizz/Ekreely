const express = require('express');
const router = express.Router();


const authenticator = require('../../../middleware/authenticator');
const DBUser = require('../../../models/user');


router.put('/edit/:id', (req, res, next) => {
    const newUser = new DBUser({
        _id: req.body.id,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        status: req.body.status,
        accessLevel: req.body.accessLevel
    });
    DBUser.updateOne({_id: req.params.id}, newUser).then( result => {
      console.log(result, newUser);
      res.status(200).json({ message: 'Update successful',
        newUser});
    })
  });
  

  router.get('', (req, res, next) => {
    DBUser.find().then(data => {
      res.status(200).json({
        userList: data
      })
    });
  });


  router.delete('/delete/:id', authenticator, (req, res, next) => {
    DBUser.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'User deleted successfully!'});
    });
  });
  
  
  module.exports = router;
  
  