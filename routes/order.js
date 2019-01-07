var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var moment = require('moment');

router.get('/', (req, res, next) => {
  let params = req.query;
  console.log(params.status);

  let today = moment().hours(0).minutes(0).seconds(0);

  let query = params;
  query.date = {"$gte" : today.toDate()};

  Order.find(query, function(err, orders) {
    if(err) console.log(err);
    else {
      orders.forEach(order => order.items.forEach(
        item => console.log(item)));
      res.json(orders);
    }
  });
});

router.post('/', (req, res, next) => {
  let params = req.body;
  console.log(params.items)
  params.items.forEach(i => i.food = i.food._id);
  console.log(params.items)

  let newOrder = new Order(params);

  newOrder.save((err, order) => {
    if(err){
      res.json(err);
    }else{
      res.json(order);
    }
  });
});

router.put('/', (req, res, next) => {
  let orderUpdate = req.body;
  console.log(orderUpdate);
  Order.findOneAndUpdate({_id:orderUpdate._id}, orderUpdate, (err, order)=>{
    if(err) res.json(err);
    else res.json(order);
  });
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Order.deleteOne({_id: id}, (err)=>{
    if(err) res.json(err);
    else res.status(200).send();
  });
});


module.exports = router;
