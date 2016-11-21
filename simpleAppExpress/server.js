var express = require('express');
var app = express();
var fs = require("fs");

var http = require('http').Server(app);
var io = require('socket.io')(http);

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

// Add item
io.on('connection', function(socket){
  socket.on('add item', function(msg){
    var item = new Item({content: msg});

    item.save(function (err, TodoObject) {
      Item.find({}, function(err, items) {
        io.emit('all messages', items)
      })

    });
  });
});

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
    res.send('del all')
   })
})

// Dell item
app.delete('/single-item', function (req, res) {

  Item.find({"_id": req.body.id}).remove(function(err, items){
    res.send('del item')
   })
})

var server = http.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
