var mongoose =  require('mongoose');
mongoose.connect('mongodb://localhost/FoodDB');

var db = mongoose.connection;

const Schema = mongoose.Schema;
const foodSchema = new Schema({
    name: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    price: {
      type: String
    }
});

foodSchema.index({name: 1});

var Food = mongoose.model('Food', foodSchema);

Food.insertMany([{
  name: 'flauta',
  price: 12.12,
  description: 'hello world',
}], (err, data) => {
  console.log(err + data)
});
module.exports = Food;
