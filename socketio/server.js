var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});


server.listen(3000,function(){
	console.log('listening on port 3000');
});

//create the socket
io.sockets.on('connection',function(socket){
	console.log('new connection');

	socket.on('disconnect',function(){
		console.log('disconnect');
	});

	socket.on('new message',function(data){
		console.log('in the new message event of js file');
		console.log(data);
		io.emit('display message',data);
	});
});
