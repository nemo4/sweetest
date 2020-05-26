const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost'
	, port: 3306
	, user: 'nemo'
	, password: 'nemo!@#'
	, database: 'nemo'
	, connectionLimit: 5
});

pool.getConnection((err, connection)=>{
	if(err){
		console.error(`error connection: ${err.stack}`);
		return;
	}
	console.log(`connected as id ${connection.threadId}`);
	pool.query('SELECT 1+1 FROM solution', (err, rows, field)=>{
		console.log('aaaaa');
		connection.release();
	});
});