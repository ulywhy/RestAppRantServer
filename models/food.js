var mongoose =  require('mongoose');
var db = require('./connection');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    //_id: String,
    name: {
      type: String,
      lowercase : true,
      minlength: 3,
      required: true,
      unique: true,
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

/*Food.insertMany([{
  name: 'FLAUTA',
  price: 12.12,
  description: 'tortilla grande dorada rellena de pollo',
}], (err, data) => {
  console.log(err + data)
});
*/

module.exports = Food;
