const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('index.html');
const SessionStr = ()=>{
	let str = "";
	const base_str = "0123456789";
	for(let i=0; i<64; i++){
		str+=base_str[Math.floor(Math.random()*base_str.length)];
	}
	return str;
}

const server = http.createServer((req, res)=>{
	let session_cookie=SessionStr();
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Set-Cookie', [
		'sessions='+session_cookie+'; Expires='+new Date(new Date().getTime()+1000*86400).toUTCString()+'; HttpOnly;'
		, 'cookie=test2; Expires='+new Date(new Date().getTime()+1000*86400).toUTCString()+';'
	]);
	res.end(index);
	console.log(session_cookie);
}).listen(8080, (err)=>{
	if(err){
		console.log(err);
	}
	console.log('server running...');
});
