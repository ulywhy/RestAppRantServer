var mongoose =  require('mongoose');
var db = require('./connection');

const Schema = mongoose.Schema;

const productAreaSchema = new Schema({

    value : {
      type: String,
      lowercase : true,
      minlength: 3,
      required: true,
      unique: true,
    },

    categories : [{
      value : {
        type : String,
        lowercase : true,
        minlength: 3,
        required: true,
        unique: true
      },

      tags : [{
        value : {
          type : String,
          lowercase : true,
          minlength: 3,
          required: true,
          unique: true
        },
      }],
    }],

    createdAt : {
      type: Date,
      default: Date.now,
    }
});

var productArea = mongoose.model('ProductArea', productAreaSchema);


module.exports = ProductArea;
