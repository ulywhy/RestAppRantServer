var express = require('express');
var router = express.Router();

var foodRouter = require('./food');
var orderRouter = require('./order');

/* RESTful service oo*/
router.use('/food', foodRouter);
router.use('/order', orderRouter);

module.exports = router;
