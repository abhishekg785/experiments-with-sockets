var express  = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    nicknames = [];

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});


server.listen(3000,function(){
	console.log('listening on port 3000');
});

//connect to socket
io.sockets.on('connection', function(socket){
	socket.on('send message',function(data){
		//send to all the users
		io.sockets.emit('new message',{msg:data,nick:socket.nickname});
	});

	socket.on('new user',function(data,callback){
		var index = nicknames.indexOf(data);
		if(index != -1){
			callback(false);
		}
		else{
			socket.nickname = data;
			nicknames.push(data);
			io.sockets.emit('usernames',nicknames);
			callback(true);
		}
	});

	socket.on('disconnect',function(data){
		console.log(socket.nickname);
		if(!socket.nickname){
			return;
		}
		nicknames.splice(nicknames.indexOf(socket.nickname),1);
		updateNickNames();
	});


	function updateNickNames(){
		io.sockets.emit('usernames',nicknames);
	}
});





