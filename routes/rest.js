var express = require('express');
var router = express.Router();

var productRouter = require('./product');
var orderRouter = require('./order');

/* RESTful service oo*/
router.use('/product', productRouter);
router.use('/order', orderRouter);

module.exports = router;
