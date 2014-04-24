
var common = require('./FretadoApp.API.Common');
var cheerio = require('cheerio');
var Q = require('q');

function getLinha(body) {
	var $ = cheerio.load(body);
	var info_linha = $('table').eq(1).find('tr');
	var linha = {
		numero: unescape(encodeURIComponent($('table').eq(0).find('tr').text())).clearText().toUpperCase().replace("ITINERÏ¿½RIOÂ LINHAÂ ", ""),  
		nome: $(info_linha[0]).text().clearText().replace("TRAJETO: ", ""),
		coordenador : {
			nome: $(info_linha[1]).text().clearText().replace("COORDENADOR: ", ""),
			telefone: $(info_linha[2]).text().clearText(),
			email: $(info_linha[3]).text().clearText().replace("E-MAIL COORDENADOR: ", ""),
		},				
		ida: [],
		volta: []
	}

	var pontos_ida = $('table').eq(4).find('tr table tr');
	for(var i = 0; i < pontos_ida.length; i += 1) {
		linha.ida.push($(pontos_ida[i]).text().clearText());
	}

	var pontos_volta = $('table').eq(6).find('tr table tr');
	for(var i = 0; i < pontos_volta.length; i += 1) {
		linha.volta.push($(pontos_volta[i]).text().clearText());
	}

	return linha;
}

exports.getLinhas = function(associacao, fn) {
	var url = associacao.site + "itinerarios.asp";

	common.httpGet(url).then(function (res) {
		return common.loadBody(res).then(function (body) {
			var $ = cheerio.load(body);
			var linhas = $('table').eq(1).find('tr');
			var url_linhas = [];
			for(i = 0; i < linhas.length; i += 1) {
				var url_linha = associacao.site + $(linhas[i]).find('a').attr('href');
				url_linhas.push(common.httpGet(url_linha).then(common.loadBody));
			}
			return url_linhas;
		});

	}).then(function (url_linhas) {		
		Q.all(url_linhas).spread(function () {
			associacao.linhas = [];
			for(i = 0; i < arguments.length; i += 1) {
				associacao.linhas.push(getLinha(arguments[i]));
			}

		}).done(function () {
			fn(associacao);
		});

	});
}