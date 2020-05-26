const cluster = require('cluster');
const http = require('http');
if(cluster.isMaster){
    let numReqs = 0;
    setInterval(()=>{
        console.log('numReqs = ', numReqs);
    }, 1000);
    
    const messageHandler = (msg)=>{
        if(msg.cmd && msg.cmd == 'notifyRequest'){
            console.log('noti!');
            numReqs += 1;
        }
    }
    
    const numCPUs = require('os').cpus().length;
    for(let i=0; i<numCPUs; i++){
        cluster.fork();
        console.log('new fork');
    }
    
    Object.keys(cluster.workers).forEach((id)=>{
        cluster.workers[id].on('message', messageHandler);
    });
    
    
}
else{
    http.Server((req, res)=>{
        res.writeHead(200);
        res.end('heool');
        
        process.send({cmd: 'notifyRequest'});
    }).listen(8080);
}