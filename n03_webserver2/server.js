/*
node web
*/
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
//var configFilePath = './configHttps.json';
var configFilePath = './configHttp.json';


var config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
//console.log(config);

var options = {
	//key: fs.readFileSync(config.sslCertFile.key),
	//cert: fs.readFileSync(config.sslCertFile.cert)
}

function action(request, response){
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './'+config.indexFile;
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = { 
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./error/err-404.html', function(error, content1) {
                    //response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content1, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
	    /*
	    if(extname == '.apk'){
	    	//response.setHeader('Content-disposition', 'attachment');
	    	//response.writeHead(200, { 'Content-disposition': 'attachment'});
		response.end(content);
	    }
	    else{
            	response.writeHead(200, { 'Content-Type': contentType });
            	response.end(content, 'utf-8');
	    }
	    */
            response.end(content, 'utf-8');
        }
    });
}

function startLog(){
	console.log('Server running at '+config.protocol+'://127.0.0.1:'+config.port+'/');
}

if(config.protocol === 'http'){
	http.createServer(function (request, response){
		action(request, response);
	}).listen(config.port);
	startLog();
}
else if(config.protocol === 'https'){
	https.createServer(options, function (request, response){
		action(request, response);
	}).listen(config.port);
	startLog();
}
else{
	console.log('config error procotol:'+config.protocol);
}
