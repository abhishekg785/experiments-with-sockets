/*
 * abhishek goswami
 */

var  express = require('express');
var app = express();

//creating instance of server to pass it in socket.io
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = []
var connections = []



server.listen(5000,function(){
	console.log('listening on port 5000');
});


app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected',connections.length);

	//Disconnect
	socket.on('disconnect',function(){
		// if(!socket.username){
		// 	return;
		// }
    users.splice(users.indexOf(socket.username),1);
		updateUserName();
		connections.splice(connections.indexOf(socket),1);
		console.log('Connected: %s sockets Disconnected',connections.length);
	});

	socket.on('send message',function(data){
		console.log(data);
		io.sockets.emit('new message',{msg:data});
	});

	//new user
	socket.on('new user',function(data,callback){
		console.log('in the new user event');
		console.log(data);
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUserName();
	});

	function updateUserName(){
		console.log(users);
		console.log('in the get users emit');
		socket.emit('get users',users);
	}

});
