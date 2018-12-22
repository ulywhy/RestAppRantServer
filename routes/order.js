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
<<<<<<< HEAD
  params.order.items.forEach(i => i.count = i._count);
  
  let newOrder = new Order({
    number: params.order.number,
    total: params.order.total,
    items: params.order.items
=======
  let itemsMap = params.items;

  let newOrder = new Order({
    number: params.order.number,
    total: params.order.total,
    items: params.order.itens
>>>>>>> ef35958048a1551a5a521ac308407ed88d2e2a86
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
