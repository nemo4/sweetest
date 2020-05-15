var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
console.log('portttttttttttttttt ' +process.env.PORT);
console.log(process.env);


var port = process.env.PORT;

http.createServer(function (req, res){
    res.writeHead(200, {'Context-Type': 'text/plain'});
    res.end(index);
}).listen(port);
