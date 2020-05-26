const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost'
	, port: 3306
	, user: 'nemo'
	, password: 'nemo!@#'
	, database: 'nemo'
	, connectionLimit: 10
});


for(let i=0; i<16; i++){
	pool.getConnection((err, connection)=>{
		if(err){
			console.error(`error connection: ${err.stack}`);
			return;
		}
		
		console.log(`connected as id ${connection.threadId}`);
		
		connection.query('SELECT 1+1 FROM solution', (err, rows, field)=>{
			console.log(new Date());
			
			setTimeout(()=>{
				connection.release();
			}, 4000);
		});
	});
}