var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var port = process.env.PORT || 8080;

console.log(process.env);

http.createServer(function (req, res){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("req.connection.remoteAddress : ", req.connection.remoteAddress);
    console.log("req.headers['x-forwarded-for'] : ", req.headers['x-forwarded-for']);
    console.log("url : ", req.url);
    
    res.writeHead(200, {'Context-Type': 'text/plain'});
    res.end(index);
}).listen(port);
