var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res){
    res.writeHead(200, {'Context-Type': 'text/plain'});
    res.end(index);
}).listen(8080);
