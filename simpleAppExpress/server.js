var express = require('express');
var app = express();
var fs = require("fs");

// ???
var mongoose = require('mongoose');
var Item = require('./mongooseConf.js');


var bodyParser = require('body-parser');

// app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Load 'index.html' page
app.get('/index.html', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/" + "index.html" );
})

// Get items from the list
app.get('/get-items', function (req, res) {
   console.log("Load items from json");

   Item.find({}, function(err, items) {
     console.log(items);
     res.send(items)
   })
})

// Add item to the list
app.post('/add-item', function (req, res) {

  console.log("Add an element to the list");

  Item.find({}, function(err, list) {
    // console.log(list[0].items);
    list[0].items.push(req.body.item)
    // console.log(list[0].items)

    list[0].save(function (err, list) {
      if (err) {
          res.status(500).send(err)
      }
      res.send(list);
    });
  })
})

// Dell items
app.delete('/delete-items', function (req, res) {
   console.log("Delete all items from JSON");

   Item.find({}, function(err, list) {
     list[0].items = [];

     list[0].save(function (err, list) {
       if (err) {
           res.status(500).send(err)
       }
       res.send(list);
     });
   })
})

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
