
var assocs = [{
		_id: 1,
		nome: "AEBS",
		endereco: "Rua Tibiriça, 449 - São Vicente",
		telefone: "(13) 3467-4141",
		email: "infoaebs@aebs.com.br",
		site: "http://www.aebs.com.br/",
		linhas: []
	},
	{
		_id: 2,
		nome: "AEXS",
		endereco: "Av. Almirante Saldanha da Gama, 190 - Santos",
		telefone: "(13) 3307-3031 / (13) 7808-5980",
		email: "aexs@aexs.com.br",
		site: "http://www.aexs.com.br/",
		linhas: []
	},
	{
		_id: 3,
		nome: "Afrebas",
		endereco: "Av. Almirante Cochrane, 194 - CJ 63 - Santos",
		telefone: "(13) 3231-7548",
		email: "afrebas@afrebas.com.br",
		site: "http://www.afrebas.com.br/",
		linhas: []
	}];

exports.getAssociacoes = function() {
	return assocs;
}

exports.getLinhas = function(idAssoc, fn) {
	switch(idAssoc) {
		case "1":
			return require('./FretadoApp.API.Associacoes.Aebs').getLinhas(assocs[0], fn);
		case "2":
			return require('./FretadoApp.API.Associacoes.Aexs').getLinhas(assocs[1], fn);
		case "3":
			return require('./FretadoApp.API.Associacoes.Afrebas').getLinhas(assocs[2], fn);
		default:
			fn({"error": "Associacao nao encontrada"});
	}
}