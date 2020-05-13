var fs = require('fs');

//sync 동기
console.log('readFileSync start');
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);
console.log('readFileSync end');

//async 비동기
console.log('readFile start');
fs.readFile('data.txt', {encoding:'utf8'},function(err, data){
    console.log(data);
});
console.log('readFile end');