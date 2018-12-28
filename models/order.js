var mongoose =  require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
var Food = require('./food');
var db = require('./connection');


const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    status:{
        type: String,
        enum: ['served', 'cancelled', 'waiting', 'paid'],
        default: 'waiting'
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
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
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

/*Food.findOne({name: "flauta" }, (err, food) => {

  Order.insertMany([{
    status:'served',
    total: 200,
    items : [{
      food: food.id,
      _count: 3,
      subtotal:200
    }]
  }], (err, data) => {
    console.log(err + data)
  });

});*/

module.exports = Order;
