var express = require('express');
var app = express();
var fs = require("fs");

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Item = require('./mongooseConf.js');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Load 'index.html' page
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/index.html', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/" + "index.html" );
})

// Get items from the list
app.get('/all-items', function (req, res) {
   console.log("Load items from json");

   Item.find({}, function(err, items) {
     console.log(items);
     res.send(items)
   })
})

// Add item to the list
app.post('/single-item', function (req, res) {
  var item = new Item(req.body);

  item.save(function (err, TodoObject) {
    if (err) {
      res.send(err);
    }
      res.send(TodoObject)
  });
})

// Edit item from the list
app.put('/single-item/:id', function (req, res) {
  Item.findOne({"_id": req.params.id}, function(err, item){
    if (err) {
      return console.error(err);
    }
    item.content = req.body.content;

    item.save (function(err, item){
      res.send(item);
    })
  })
})

// Dell items
app.delete('/all-items', function (req, res) {
  Item.find({}).remove(function(err, items){
    res.send('delllll allllll')
   })
})

// Dell item
app.delete('/single-item', function (req, res) {

  Item.find({"_id": req.body.id}).remove(function(err, items){
    res.send('delllll allllll')
   })
})

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
