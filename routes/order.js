var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.get('/', (req, res, next) => {
  let params = req.query;
  let query = {
    status : params.status || '',
  }
  Order.find(query).
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

  params.order.items.forEach(i => i.food = i.food._id);

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

router.put('/', (req, res, next) => {
  let orderUpdate = req.body.order;
  console.log(orderUpdate);
  Order.findOneAndUpdate({_id:orderUpdate._id}, orderUpdate, (err, order)=>{
    if(err) res.json(err);
    else res.json(order);
  });
});

module.exports = router;
