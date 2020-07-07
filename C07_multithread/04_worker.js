setInterval(()=>{
	process.send('worker');
}, 1000);

setTimeout(()=>{
	error_funciton();
}, 5000);