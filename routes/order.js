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
  let itemsMap = params.order.items;

  Food.find({name:{$in:Array.from(itemsMap.values())}},
    (err, foods) => {
      if(foods){
        foods.forEach(function(food){
          let item = itemsMap.get(food.name);
          //item has only th food id
          item.food = food._id;
        });

        let newOrder = new Order({
          number: params.order.number,
          total: params.order.total,
          items: Array.from(itemsMap.values())

        });
        newOrder.save((err, order) => {
          if(err){
            res.json(err);
          }else{
            res.json(order);
          }
        });
      }
  });
});

module.exports = router;
