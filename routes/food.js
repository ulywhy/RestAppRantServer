var express = require('express');
var router = express.Router();
var Food = require('../models/food');

router.get('/', (req, res, next) => {

  Food.find({}, null, {sort:{name:1}}, (err, food) => {
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

router.put('/', (req, res, next) => {
  let foodUpdate = req.body.food;
  console.log(foodUpdate);
  Food.findOneAndUpdate({_id:foodUpdate._id}, foodUpdate, (err, food)=>{
    if(err) res.json(err);
    else res.json(food);
  });
});

router.delete('/:id', (req, res, next) => {
  console.log("deleting");
  let id = req.params.id;
  Food.deleteOne({_id: id}, (err)=>{
    if(err) res.json(err);
    else res.status(200).send();
  });
});

module.exports = router;
