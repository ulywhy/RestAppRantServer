var mongoose =  require('mongoose');
var uri = 'mongodb+srv://serverAdmin:jSK2fzge3iSOALAf@cluster0-44v1f.mongodb.net/test?retryWrites=true';
mongoose.connect(uri);

var db = mongoose.connection;

module.exports = db;
