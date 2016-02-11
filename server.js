var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes');
var path = require('path');
var port = 4000;

app.use(require('stylus').middleware(__dirname + '/public'));
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', port)
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/',routes.index);

//socket io

var count = 0;
io.on('connection',function(socket){
	count++;
	io.sockets.emit('welcome', count); // emmit

	socket.on('draw', function (movements){ // listen
		console.log('movements ...', movements);
		io.sockets.emit('update', movements); // emit
	}) 
})

http.listen(app.get('port'), function (){
	console.log('server listen port : ' + app.get('port'))
})