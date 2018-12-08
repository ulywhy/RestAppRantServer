var express = require('express');
var router = express.Router();

var foodRouter = require('./food');
/* RESTful service oo*/
router.use('/food', foodRouter);

module.exports = router;
