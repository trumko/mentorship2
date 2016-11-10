var http = require('http');
var fs = require('fs');

http.createServer( function (request, response) {
  var url = request.url;

  // add item to the list
  if (url == '/add-item' && request.method == 'PUT') {
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

  // delete item from the list
  if (url == '/delete-items' && request.method == 'DELETE') {
    var emptyList = '{"items":[]}';

    fs.writeFile('input-data.json', emptyList,  function(err) {
      if (err) {
        return console.error(err);
      }
      response.end(emptyList);
    });
  }

  // Get items from JSON when page loads
  if (url == '/get-items' && request.method == 'GET') {
    fs.readFile('input-data.json', function (err, data) {
      if (err) {
        return console.error(err);
      }
      response.end(data);
    });
  }

  // load files
  if ((url == '/index.html' || url == '/script.js') && request.method == 'GET') {
    fs.readFile(url.substr(1), function (err, data) {
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
