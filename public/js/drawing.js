$(document).ready(function(){
	console.log('init');
})

var socket = io();

socket.on('welcome', function(count){ // listen
	$('.count').text(count);
})

// need variables
var movements = new Array();
var pulse;
var context;

var createLienzo = function(){
	var canvasDiv = document.getElementById('board');
	var canvas = document.createElement('canvas');
	
	canvas.setAttribute('width',500);
	canvas.setAttribute('height',500);
	
	canvasDiv.appendChild(canvas);

	context = canvas.getContext('2d');

	$("canvas").mousedown(function(e){
		pulse = true;
		socket.emit('draw', [ e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false ]); // false is not paint
	});

	$("canvas").mousemove(function(e){
		if(pulse){
			socket.emit('draw', [ e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true ]);
		}
	});

	$("canvas").mouseup(function(e){
		pulse = false;
	})

	$("canvas").mouseleave(function(){
		pulse = false;
	})
}

var drawing = function(mov){
	movements.push(mov);
	context.lineJoin = "round"; // type paint
	context.lineWidth = 6;
	context.strokeStyle = "green";
	for(var i=0, cant = movements.length ; i < cant; i++){
		context.beginPath();
		
		if( movements[i][2] && i){ // if paint is true and second iter
			context.moveTo(movements[i-1][0], movements[i-1][1]);
		}else{
			context.moveTo(movements[i][0], movements[i][1]);
		}
		context.lineTo(movements[i][0], movements[i][1]);
		
		context.closePath();
		context.stroke();
	}
}

socket.on('update', function(_movements){
	drawing(_movements);
})



