var mongoose =  require('mongoose');
var uri = 'mongodb+srv://serverAdmin:jSK2fzge3iSOALAf@cluster0-44v1f.mongodb.net/test?retryWrites=true';

mongoose.set('useCreateIndex', true);

mongoose.connect(uri,
  function(err){
    if(err) console.log(err);
    else{
      console.log('cluster connection established');
    }
  });

var db = mongoose.connection;

module.exports = db;
