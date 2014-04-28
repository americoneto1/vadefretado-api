
var API = require('./lib/FretadoApp.API.Associacoes');
var restify = require('restify');
var app = restify.createServer();
var port = process.env.PORT || 8888;

var customSend = function(associacao, res) {
	if(typeof associacao === "undefined") {
		res.send(404, {"error": "Associação não encontrada"});
	} else {
		res.send(200, associacao);
	}
}

app.use(restify.queryParser());
app.use(restify.jsonp());

app.get("/api", function(req, res) {
	res.send({
		"version": "0.0.1"
	});
});

app.get("/api/associacoes", function(req, res) {
	res.charSet('utf-8');
	console.log('Request /api/associacoes');
	res.send(API.getAssociacoes());
});

app.get("/api/associacoes/:id", function(req, res) {
	res.charSet('utf-8');
	console.log('Request /api/associacoes/'+ req.params.id);
	var associacao = API.getAssociacao(req.params.id);
	customSend(associacao, res);
});

app.get("/api/associacoes/:id/linhas", function(req, res) {
	res.charSet('utf-8');
	console.log('Request /api/associacoes/'+ req.params.id +'/linhas');
	API.getLinhas(req.params.id, function(associacao) {
		customSend(associacao, res);
	});
});

app.get(/^(.*)/, function(req, res) {
	res.charSet('utf-8');
	res.send(404, {"error": "Recurso não encontrado"});
})

app.listen(port, function() { 
	console.log('API running on', port, 'port'); 
});