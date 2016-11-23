var startApp = require('./startApp');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();

var io = require('socket.io')(http);

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./mongooseConf.js');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// Use Router
app.use('/', startApp)

app.use(function(err, req, res, next) {
  res.send('<h1>Something doesn\'t work<h1>');
})

// Get items from the list
io.on('connection', function(socket) {
  Item.find({}, function(err, items) {
    io.emit('send all messages', items)
  })
});

// Add item to the list
io.on('connection', function(socket) {
  socket.on('add item', function(msg) {
    var item = new Item({content: msg});
    item.save(function(err, TodoObject) {
      Item.find({}, function(err, items) {
        io.emit('send all messages', items)
      })
    });
  });
});

// Edit item from the list
io.on('connection', function(socket) {
  socket.on('edit item', function(msg) {

    Item.findOne({
      "_id": msg.curId
    }, function(err, item) {
      if (err) {
        return console.error(err);
      }
      item.content = msg.value;

      item.save(function(err, TodoObject) {
        Item.find({}, function(err, items) {
            io.emit('send all messages', items)
        })
      });
    })
  });
});

// Dell all items from the list
io.on('connection', function(socket) {
  socket.on('del all', function() {
    Item.find({}).remove(function(err, items) {
      io.emit('send all messages', [])
      })
  });
});

// Dell single item from the list
io.on('connection', function(socket) {
  socket.on('del single item', function(id) {
    Item.find({"_id": id}).remove(function(err, items) {
      Item.find({}, function(err, items) {
        io.emit('send all messages', items)
      })
    })
  });
});

var server = http.listen(4000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
