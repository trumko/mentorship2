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

  fs.readFile('input-data.json', function (err, data) {
    if (err) {
      return console.error(err);
    }
    var newObj = JSON.parse(data);
    newObj.items.push(req.body.item);
    console.log(newObj);

    fs.writeFile('input-data.json', JSON.stringify(newObj),  function(err) {
      if (err) {
        return console.error(err);
      }
      res.sendFile( __dirname + "/" + 'input-data.json' );
    });
  });
})

// Dell items
app.delete('/delete-items', function (req, res) {
   console.log("Delete all items from JSON");
   var emptyList = '{"items":[]}';
   fs.writeFile('input-data.json', emptyList,  function(err) {
     if (err) {
       return console.error(err);
     }
     res.sendFile( __dirname + "/" + 'input-data.json' );
   });
})

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
