var mongoose =  require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
var Product = require('./product');
var db = require('./connection');


const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    paid : {
      type: Boolean,
      default: false
    },
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
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true
      },
      _count: Number,
      _subtotal: Number
    }],
    date: {
      type: Date,
      default: Date.now,
    }
});

OrderSchema.plugin(require('mongoose-autopopulate'));
OrderSchema.plugin(autoIncrement, {
  inc_field:'number'
});

var Order = mongoose.model('Order', OrderSchema);

/*product.findOne({name: "flauta" }, (err, product) => {

  Order.insertMany([{
    status:'served',
    total: 200,
    items : [{
      product: product.id,
      _count: 3,
      subtotal:200
    }]
  }], (err, data) => {
    console.log(err + data)
  });

});*/

module.exports = Order;
