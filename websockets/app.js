window.onload = function(){
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  //creating a new WebSocket
  var socket = new WebSocket('ws://localhost:8000/');

  //two events onopen and onerror

  //opening the connection
  socket.onopen = function(event){
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
    socketStatus.className = 'open';
  }

  //handling the error
  socket.onerror = function(error){
    console.log(error);
  }
}
