var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', (req, res, next) => {

  Product.find({}, null, {sort:{name:1}}, (err, product) => {
    console.log(product);
    res.json(product);
  });

});

router.post('/', (req, res, next) => {
  let product = req.body;
  console.log(product)
  let newProduct = new Product({
    name: product.name,
    price: product.price,
    description: product.description
  });

  newProduct.save((err, product) => {
    if(err){
      res.json(err);
    }else{
      res.json(product);
    }
  });
});

router.put('/', (req, res, next) => {
  let productUpdate = req.body.product;
  console.log(productUpdate);
  Product.findOneAndUpdate({_id:productUpdate._id}, productUpdate, (err, product)=>{
    if(err) res.json(err);
    else res.json(product);
  });
});

router.delete('/:id', (req, res, next) => {
  console.log("deleting");
  let id = req.params.id;
  Product.deleteOne({_id: id}, (err)=>{
    if(err) res.json(err);
    else res.status(200).send();
  });
});

module.exports = router;
