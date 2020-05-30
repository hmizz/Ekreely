const express = require('express');
const router = express.Router();


const authenticator = require('../../../middleware/authenticator');
const DBUser = require('../../../models/user');


router.put('/edit/:id', authenticator, (req, res, next) => {
    const newUser = new DBUser({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        country: req.body.country,
        region: req.body.region,
        zipCode: req.body.zipCode,
        createdOn: req.body.createdOn,
        modifiedOn: req.body.modifiedOn,
        lastAccessed: req.body.lastAccessed,
        status: req.body.status
    });
    dbArticle.updateOne({_id: req.params.id}, newUser).then( result => {
      console.log(result, newUser);
      res.status(200).json({ message: 'Update successful',
        newUser});
    })
  });
  

  router.get('', (req, res, next) => {
    dbArticle.find().then(data => {
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
  
  