
exports.index = function (req, res, next){
	//res.send('hi from node');
	res.render('index', { message : "welcome to real time"});
}