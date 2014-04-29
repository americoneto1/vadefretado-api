
var common = require('./FretadoApp.API.Common');
var cheerio = require('cheerio');
var Q = require('q');

function getLinha(body) {
	var $ = cheerio.load(body);
	var info_linha = $('table').eq(1).find('tr');
	var linha = {
		numero: $('#BoxV1 td.top').text().toUpperCase().replace("LINHA ", ""),
		nome: $('#BoxV1 td.top').text(),
		coordenador : {
			nome: "N/A",
			telefone: "N/A",
			email: "N/A",
		},		
		ida: [],
		volta: []
	}

	var pontos_ida = $('#BoxV1 table.bordasimples').eq(0).find('tr');
	for(var i = 2; i < pontos_ida.length; i += 1) {
		var tds = $(pontos_ida[i]).find('td');
		var text = $(tds[0]).text() + " hs - " + $(tds[1]).text().toUpperCase() + " - " + $(tds[2]).text().toUpperCase();
		linha.ida.push(text.clearText());
	}

	var pontos_volta = $('#BoxV1 table.bordasimples').eq(1).find('tr');
	for(var i = 2; i < pontos_volta.length; i += 1) {
		var tds = $(pontos_volta[i]).find('td');
		var text = $(tds[0]).text() + " hs - " + $(tds[1]).text().toUpperCase() + " - " + $(tds[2]).text().toUpperCase();
		linha.volta.push(text.clearText());
	}

	return linha;
}

exports.getLinhas = function(associacao, fn) {
	var url = associacao.site + "linhas.asp";

	common.httpGet(url).then(function (res) {
		return common.loadBody(res).then(function (body) {
			var $ = cheerio.load(body);
			var linhas = $('#BoxV1 > tr:nth-child(2) > td:nth-child(2) > table > tr:nth-child(1) > td > table').eq(1).find('.bordasimples').find('a.TextoMedium');
			var url_linhas_aux = [];
			var url_linhas = [];
			for(var i = 0; i < linhas.length; i+=1) {
				var url_linha = associacao.site + $(linhas[i]).attr('href');
				url_linhas_aux.push(url_linha);
			}
			url_linhas_aux = url_linhas_aux.getUnique();

			for(var i = 0; i < url_linhas_aux.length; i += 1) {
				var url_linha = url_linhas_aux[i];
				url_linhas.push(common.httpGet(url_linha).then(common.loadBody));
			}
			return url_linhas;
		});

	}).then(function (url_linhas) {		
		Q.all(url_linhas).spread(function () {
			associacao.linhas = [];
			for(var i = 0; i < arguments.length; i += 1) {
				associacao.linhas.push(getLinha(arguments[i]));
			}

		}).done(function () {
			fn(associacao);
		});

	});
}