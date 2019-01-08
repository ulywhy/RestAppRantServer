var mongoose =  require('mongoose');
var db = require('./connection');
var ProductArea = require('./product-area');

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    },
    area : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductArea',
      autopopulate: true
    }
});

var product = mongoose.model('Product', productSchema);

/*product.insertMany([{
  name: 'FLAUTA',
  price: 12.12,
  description: 'tortilla grande dorada rellena de pollo',
}], (err, data) => {
  console.log(err + data)
});
*/

module.exports = product;
