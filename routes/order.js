var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.get('/', (req, res, next) => {
  console.log("serving orders");
  Order.find().
  populate({
      path: 'items.food',
      model: 'Food'
  }).exec(function(err, orders) {
    if(err) console.log(err);
    else {
      console.log(orders);
      res.json(orders);
    }
  });

});

module.exports = router;
