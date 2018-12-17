var mongoose =  require('mongoose');
var db = require('./connection');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    price: {
      type: Number,
      required: function(){
        return this.price > 0;
      },
    },
    description: {
      type: String,
      default: "",
    }
});

var Food = mongoose.model('Food', foodSchema);
/*
Food.insertMany([{
  name: 'flauta',
  price: 12.12,
  description: 'hello world',
}], (err, data) => {
  console.log(err + data)
});
*/
module.exports = Food;
