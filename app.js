var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

console.log(process.env);

var port = process.env.PORT || 8080;

http.createServer(function (req, res){
    res.writeHead(200, {'Context-Type': 'text/plain'});
    res.end(index);
}).listen(port);
