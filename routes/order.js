var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var mongoose =  require('mongoose');

router.get('/', (req, res, next) => {
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

router.post('/', (req, res, next) => {
  let params = req.body;
  console.log(params)
  params.order.items.forEach(i => i.count = i._count);
  
  let newOrder = new Order({
    number: params.order.number,
    total: params.order.total,
    items: params.order.items
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
