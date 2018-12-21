var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.get('/', (req, res, next) => {
  Order.find().
  populate({
      path: 'items.food',
      model: 'Food'
  }).exec(function(err, orders) {
    if(err) console.log(err);
    else {
      res.json(orders);
    }
  });
});

router.post('/', (req, res, next) => {
  let params = req.body;

  let newOrder = new Order({
    number: params.number,
    total: params.total,
    items: params.items.map(i => i._id)
  });

  newOrder.save((err, order) => {
    if(err){
      res.json(err);
    }else{
      res.json(order);
    }
  });
});

module.exports = router;
