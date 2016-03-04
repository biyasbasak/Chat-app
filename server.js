var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); // create a new server 
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// socket refers to an individual connection
io.on('connection', function (socket){
	console.log('User connected via socket.io');
	//custom event message which the front end listens to and acts accordingly
	socket.emit('message',{
		text: 'Welcome to the chat application!'
	});
});	

http.listen(PORT, function(){
	console.log('server started');
}); 
  