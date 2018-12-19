var mongoose =  require('mongoose');
var Food = require('./food');
var db = require('./connection');

const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    number: {
      type: Number,
    },
    total: {
      type: Number,
      required: function(){
        return this.price >= 0;
      },
    },
    items: [{
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
      },
      count: Number,
      subtotal: Number
    }],
    date: {
      type: Date,
      default: Date.now,
    }
});

Food.find({}, (err, docs) => {
  let set = new Set(docs);
  console.log(set);
  let items = Array.from(set.values());
  console.log(items);
  let order = new Order({
    number:10,
    total:100,
    items:items,
  });
  console.log(order)
});

var Order = mongoose.model('Order', OrderSchema);
/*
Food.findOne({name: "flauta" }, (err, food) => {

  Order.insertMany([{
    number: 1,
    total: 200,
    items : [{
      food: food.id,
      count: 3,
      subtotal:200
    }]
  }], (err, data) => {
    console.log(err + data)
  });

});*/
module.exports = Order;
