var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer( function (request, response) {
   var pathname = url.parse(request.url).pathname;
   console.log(pathname, request.method);

   if (pathname == '/input.txt' && request.method == 'PUT') {
     var content = '';
     request.on('data', function(data) {
       content += data;
     })

     request.on('end', () => {
          fs.writeFile('input.txt', content.toString(),  function(err) {
            if (err) {
               return console.error(err);
            }
            response.end(content);
         });
        });
   }

   if ((pathname == '/index.html' || pathname == '/script.js') && request.method == 'GET') {
     fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
           console.log(err);
           response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
           response.writeHead(200, {'Content-Type': 'text/html'});
           response.write(data.toString());
           console.log(data);
        }
        response.end();
     });
   }


}).listen(4000);

console.log('Server running at http://127.0.0.1:4000/');
