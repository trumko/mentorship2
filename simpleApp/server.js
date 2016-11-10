var http = require('http');
var fs = require('fs');
var url = require('url');

var json = require('./input-data')

http.createServer( function (request, response) {
  var pathname = url.parse(request.url).pathname;

  if (pathname == '/add-item' && request.method == 'PUT') {
    console.log('write to page')
    var content = '';
    request.on('data', function(data) {
      content += data;
    })

    request.on('end', function() {
      console.log(content);
      fs.readFile('input-data.json', function (err, data) {
        if (err) {
        return console.error(err);
      }
      var newObj = JSON.parse(data);
      newObj.items.push(JSON.parse(content).item);

        fs.writeFile('input-data.json', JSON.stringify(newObj),  function(err) {
          if (err) {
            return console.error(err);
          }
          response.end(JSON.stringify(newObj));
        });
      });
    });
  }


  if (pathname == '/input-data' && request.method == 'DELETE') {
    var emptyList = '{"items":[]}';

    fs.writeFile('input-data.json', emptyList,  function(err) {
      if (err) {
        return console.error(err);
      }
      response.end(emptyList);
    });
  }



  if (pathname == '/input-data' && request.method == 'GET') {
    fs.readFile('input-data.json', function (err, data) {
      if (err) {
        return console.error(err);
      }
      response.end(data);
    });
  }



  // // Get items from JSON when page loads
  if ((pathname == '/index.html' || pathname == '/script.js') && request.method == 'GET') {
    fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(data.toString());
        }
        response.end();
     });
  }

}).listen(4000);

console.log('Server running at http://127.0.0.1:4000/');
