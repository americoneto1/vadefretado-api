
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
	},
	{
		_id: 4,
		nome: "Central de Fretes",
		endereco: "Rua Dr. Tolentino Filgueiras, 119 Cj. 52 - Santos",
		telefone: "(13) 3284-5758",
		email: "cdfretes@cdfretes.com.br",
		site: "http://www.cdfretes.com.br/",
		linhas: []
	},
	{
		_id: 5,
		nome: "Santos Alphaville",
		endereco: "",
		telefone: "(13) 7822-9644 / ID Nextel: 126*102987",
		email: "luiz_als@terra.com.br / 4253.lals@bradesco.com.br",
		site: "http://fretadosantosalphaville.com.br/",
		linhas: []
	}];

exports.getAssociacoes = function() {
	return assocs;
}

exports.getAssociacao = function(id) {
	for (var i = assocs.length - 1; i >= 0; i--) {
		if(assocs[i]._id == id) {
			return assocs[i];
		}
	}
}

exports.getLinhas = function(idAssoc, fn) {
	switch(idAssoc) {
		case "1":
			return require('./FretadoApp.API.Associacoes.Aebs').getLinhas(assocs[0], fn);
		case "2":
			return require('./FretadoApp.API.Associacoes.Aexs').getLinhas(assocs[1], fn);
		case "3":
			return require('./FretadoApp.API.Associacoes.Afrebas').getLinhas(assocs[2], fn);
		case "4":
			return require('./FretadoApp.API.Associacoes.CDFretes').getLinhas(assocs[3], fn);
		case "5":
			return require('./FretadoApp.API.Associacoes.SantosAlpha').getLinhas(assocs[4], fn);
		default:
			fn();
	}
}