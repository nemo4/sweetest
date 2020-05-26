const http = require('http');

const server = http.createServer((req, res)=>{
   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("req.connection.remoteAddress : ", req.connection.remoteAddress);
    console.log("req.headers['x-forwarded-for'] : ", req.headers['x-forwarded-for']);
    console.log("url : ", req.url);
    console.log("header : ", req.headers);
    
    res.statusCode = 200;
    res.setHeader('Context-Type', 'text/plain');
    res.end('Hello World\n' + JSON.stringify(req.headers, null, 4));
});

server.listen(8080, (err)=>{
   if(err){
       console.log(err);
   } 
    console.log(`Server running`);
});