/*
 * A Mongoose script connecting to a MongoDB database given a MongoDB Connection URI.
 */
var mongoose = require('mongoose').set('debug', true);

var mongodbUri = 'mongodb://mLabUser:12345@ds011893.mlab.com:11893/todolist_db';

mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));





  // Create item schema
  var songSchema = mongoose.Schema({
    items: []
  });

  // Store item documents in a collection called "items"
  var Item = mongoose.model('List_item', songSchema);


// ???
module.exports = Item;
