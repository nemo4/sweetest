const port = 8080; //포트번호 8081번

var express = require('express'); //express 사용, 안될 경우 npm install -g express, npm link express 입력
var app = express();

app.use(express.static(__dirname)); //css, html 파일들을 사용하기 위해서 정적파일로 해당 모든 폴더를 정적파일로 함.


app.get("/",function(req,res) // "/"에 들어왔을 경우에 response로 해당 메인 폴더에 있는 index.html을 보냄.
{
	res.sendFile(__dirname+'/index.html');
})

var server = app.listen(process.env.PORT || port, function() // 서버를 port 번호 대로 열음
{
    console.log("Express server has started on port "+port)
});