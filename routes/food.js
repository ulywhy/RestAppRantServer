var express = require('express');
var router = express.Router();
var Food = require('../models/food');

router.get('/', (req, res, next) => {

  Food.find({}, (err, food) => {
    console.log(food);
    res.json(food);
  });

});

router.post('/', (req, res, next) => {
  let params = req.body;
  console.log(params)
  let newFood = new Food({
    name: params.name,
    price: params.price,
    description: params.description
  });


  newFood.save((err, food) => {
    if(err){
      res.json(err);
    }else{
      res.json(food);
    }
  });
});

module.exports = router;
