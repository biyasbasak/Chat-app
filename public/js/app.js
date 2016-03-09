var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

$('#room').text(room);

console.log(name + 'wants to join ' + room);

socket.on('connect', function () {
	console.log('connected to socket.io server');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

//listens to the message event and then displays the text
socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = $('.messages');
	console.log('new message:');
	console.log(message.text);
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = $('#message-form');

//listens for submit event 
$form.on('submit', function(event){
	event.preventDefault();  //prevent the page from refreshing
	
	var $message = $form.find('input[name=message]');
	
	//creating a custom event message for the server to listen to
	socket.emit('message',{
		name: name, // name of the user
		text: $message.val() // text typed
	});
	$message.val(''); // reset the form to blank
});