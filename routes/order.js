var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.get('/', (req, res, next) => {
  Order.find().
  populate({
      path: 'items.food',
      model: 'Food'
  }).exec(function(err, orders) {
    if(err)
    else {
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

    console.log(newOrder);

    newOrder.save((err, order) => {
      if(err){
        res.json(err);
        console.log(err);
      }else{
        res.json(order);
      }
    });
  });

});

module.exports = router;
