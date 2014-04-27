
var restify = require('restify');
var app = restify.createServer();
var port = process.env.PORT || 8888;

app.use(restify.queryParser());
app.use(restify.jsonp());

app.get("/api/associacoes/:id/linhas", function(req, res) {
	res.charSet('utf-8');
	console.log('Request /api/associacoes/', req.params.id, '/linhas');
	var API = require('./lib/FretadoApp.API.Associacoes');
	API.getLinhas(req.params.id, function(associacao) {
		res.send(associacao);
	});
});

app.listen(port, function() { 
	console.log('API running on', port, 'port'); 
});