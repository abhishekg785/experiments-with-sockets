/*
 * Author:Abhishek Goswami
 */

var app = require('http').createServer(handler);
var io = require('socket.io')(app);	
var fs = require('fs');

app.listen(3000,function(){
	console.log('listening on port 3000');
});

function handler(req,res){
	fs.readFile(__dirname + '/index.html',function(err,data){
		if(err){
			res.writeHead(500);
			res.end('Error loading index.html');
		}
		else{
			res.writeHead(200);
			res.end(data);
		}
	});
}

io.on('connection', function(){
	socket.emit('news',{hello:'world'});
	socket.on('my other event',function(){
		console.log(data);
	});
});
