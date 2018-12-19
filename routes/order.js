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


  router.post('/', (req, res, next) => {
    let params = req.body;
    console.log(params)
    let newOrder = new Order({
      number: 3,
      total: params.order.total,
      items: Array.from(params.order.items.values())
    });


    newOrder.save((err, order) => {
      if(err){
        res.json(err);
      }else{
        res.json(order);
      }
    });
  });

});

module.exports = router;
