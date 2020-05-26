const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
client.set("item:abc", "some val", 'ex', 100, (err, result)=>{
	console.log(`Resule: ${result}`);
});
client.setex("item:abc", 100, "some val", (err, result)=>{
	console.log(`Resule: ${result}`);
});