const cluster = require('cluster');
cluster.setupMaster({
	exec: '04_worker.js'
});

const worker = cluster.fork();
worker.on('message', (msg)=>{
	console.log(msg);
});
worker.on('error', ()=>{
	console.log('error');
});
worker.on('exit', (code, signal)=>{
	if(signal){
		console.log(`worker was killed by signal: ${signal}`);
	}
	else if(code !== 0){
		console.log(`worker exited with error code: ${code}`);
	}
	else{
		console.log('worker success');
	}
});

setInterval(()=>{
	console.log('running...');
}, 1000);