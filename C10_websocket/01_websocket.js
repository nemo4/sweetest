const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	ws.on('open', ()=>{
		console.log(`ws open`);
	});
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
	});
	ws.on('close', (code, reason)=>{
		console.log(`ws close ${code} ${reason}`);
	});
	
	ws.send('something');
});
wss.on('close', ()=>{
    console.log(`wss closed`);
});
wss.on('error', (err)=>{
    console.log(`wss err ${err}`);
});
wss.on('headers', (headers)=>{
    console.log(`wss headers ${headers}`);
});
wss.on('listening', ()=>{
    console.log(`wss listening `);
});
