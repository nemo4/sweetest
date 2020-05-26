const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log(`${getTime()} Master ${process.pid} is start ====`);
	
	cluster.on('online', (worker) => {
		console.log(`${getTime()} Master cluster.on('online' ${worker.process.pid} online`);
	});
	cluster.on('exit', (worker, code, signal) => {
		console.log(`${getTime()} Master cluster.on('exit' ${worker.process.pid} died`);
	});
	cluster.on('message', (msg) => {
		console.log(`${getTime()} Master cluster.on('message' receive message `);
	});
	cluster.on('fork', (worker) => {
		console.log(`${getTime()} Master cluster.on('fork' ${JSON.stringify(worker)}`);
	});
	
	
	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		const worker = cluster.fork();
		
		worker.on('disconnect', () => {
			console.log(`${getTime()} worker worker.on('disconnect' ${worker.process.pid} disconnect`);
		});
		worker.on('listening', (address) => {
			console.log(`${getTime()} worker worker.on('listening' ${worker.process.pid} listening ${JSON.stringify(address)}`);
		});
		worker.on('message', (msg) => {
			console.log(`${getTime()} worker worker.on('message' ${worker.process.pid} message ${JSON.stringify(msg)}`);
		});
		worker.on('online', () => {
			console.log(`${getTime()} worker worker.on('online' ${worker.process.pid} online`);
		});
		worker.on('error', () => {
			console.log(`${getTime()} worker worker.on('error' ${worker.process.pid} error`);
		});
	}
	
	let timeout = setTimeout(() => {
		console.log(`${getTime()} Master send text`);
		//console.log(cluster.workers[1]);
	//	worker.disconnect();
		
		// 마스터 -> 워커 send
		cluster.workers[1].send('aaaaa');
		cluster.workers[1].disconnect();
//			cluster.workers[1].kill();
	}, 2000);
    
	console.log(`${getTime()} Master ${process.pid} is end ====`); 
}
else if (cluster.isWorker) {
	console.log(`${getTime()} Worker ${process.pid} start ====`);
	// Workers can share any TCP connection
	// In this case it is an HTTP server
	http.createServer((req, res) => {
		res.writeHead(200);
		res.end('hello world\n');

		// 워커 -> 마스터 send
		console.log(`${getTime()} worker send text`);
		process.send({ cmd: `${getTime()} Worker send ${process.pid} ${req.url}` });
	}).listen(8080);
	
	// 마스터 -> 워커 리스너등록
	process.on('message', (msg)=>{
		console.log(`${getTime()} worker process.on('message' ${process.pid} message ${JSON.stringify(msg)}`);
	});
	
	console.log(`${getTime()} worker ${process.pid} end ==== ${cluster.worker.id} `);
}
else{
	console.log(`???????????????????????????? ====`);
}

function getTime(){
	var currentTimeMillis = new Date().getTime();
//	var currentTimeMillis = new Date();
	return currentTimeMillis;
}