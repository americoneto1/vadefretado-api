
var common = require('./FretadoApp.API.Common');
var cheerio = require('cheerio');
var Q = require('q');
var entities = require('entities');

function getLinha(body) {
	body = entities.decodeHTML(body);
	var $ = cheerio.load(body);
	var linha = {
		numero: $('div').find('span').eq(0).text().clearText().replace("Linha ", ""),  
		nome: $('div').find('strong').eq(0).html().clearText().replace("<br>", " / "),
		coordenador: getCoordenador()
	};
	linha.ida = getIda($.html(), linha.numero);
	linha.volta = getVolta($.html(), linha.numero);
	return linha;
}

function getIda(html, numero) {
	var indices = {};
	if (numero == "01") {
		indices.inicial = 549;
		indices.qtde = 2413;
	}
	if (numero == "02") {
		indices.inicial = 671;
		indices.qtde = 2674;
	}
	return getItinerario(html, indices);
}

function getVolta(html, numero) {
	var indices = {};
	if (numero == "01") {
		indices.inicial = 3057;
		indices.qtde = 1764;
	}
	if (numero == "02") {
		indices.inicial = 3512;
		indices.qtde = 1497;
	}
	return getItinerario(html, indices);
}

function getItinerario(html, indice) {
	var result = [];
	var arr = html.substr(indice.inicial, indice.qtde).split('\n');
	for(var i = 0; i < arr.length; i += 1) {
		result.push(cleanText(arr[i]));
	}
	return result;
}

function getCoordenador() {
	return {
		nome: "Roberto / Luiz",
		telefone: "(13) 9778-7624 / (11) 9908-1119",
		email: "rob_r_s@hotmail.com / luiz@levitare.com.br"
	}
}

function cleanText(str) {
	return str.clearText().replace('<strong>', '')
						  .replace('</strong>', '')
						  .replace('<br>', '')
						  .replace(':00 – ', ' - ');
}

exports.getLinhas = function(associacao, fn) {
	var url = associacao.site + "servicos/transporte2.php";

	common.httpGet(url).then(function (res) {		
		return common.loadBody(res).then(function (body) {
			body = body.toString('binary');
			var $ = cheerio.load(body);
			var linhas = $('body > div');
			associacao.linhas = [];
			for(var i = 0; i < linhas.length; i += 1) {
				associacao.linhas.push(getLinha($(linhas[i]).html()));
			}
			fn(associacao);
		});
	});
}