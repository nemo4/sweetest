const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('index.html');

const SessionStr = ()=>{
	let str = "";
	const base_str = "0123456789";
	for(let i=0; i<12; i++){
		str+=base_str[Math.floor(Math.random()*base_str.length)];
	}
	return str;
}

const parseCookies = ( cookie = '' ) => {
    console.log("cookie : ",cookie);
    return cookie
        .split(';')
        .map( v => v.split('=') )
        .map( ([k, ...vs]) => [k, vs.join('=')] )
        .reduce( (acc, [k,v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
}

// 세션map
let sessionMap = new Map();

const server = http.createServer((req, res)=>{
	let url = req.url;
	if(url === '/'){
		console.log('/');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(index);
	}
	else if(url === '/loginAjax'){
		console.log('loginAjax');
		
		const cookies = parseCookies(req.headers.cookie);
		if(cookies.sessionId === undefined || cookies.sessionId == ''){
			let session_cookie=SessionStr();
			
			sessionMap.set(session_cookie, new Date());
			
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Set-Cookie', [
				// 'sessions='+session_cookie+'; Expires='+new Date(new Date().getTime()+1000*86400).toUTCString()+'; HttpOnly;'
				'sessionId='+session_cookie+';'
			]);
		}
		else{
			sessionMap.set(cookies.sessionId, new Date());
		}
		
		res.end(JSON.stringify({
			result: true
		}));
		
		console.log(sessionMap);
	}
	else if(url === '/logoutAjax'){
		console.log('logoutAjax');
		
		const cookies = parseCookies(req.headers.cookie);
		if(cookies.sessionId === undefined || cookies.sessionId == ''){
			
		}
		else{
			sessionMap.delete(cookies.sessionId);
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Set-Cookie', [
				'sessionId=; Max-Age=0; '
			]);
		}
		
		res.end(JSON.stringify({
			result: true
		}));
		
		console.log(sessionMap);
	}
}).listen(8080, (err)=>{
	if(err){
		console.log(err);
	}
	console.log('server running...');
});
