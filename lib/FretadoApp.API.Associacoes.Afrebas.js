
var common = require('./FretadoApp.API.Common');
var cheerio = require('cheerio');
var Q = require('q');

function getLinha(body, nome) {
	var $ = cheerio.load(body);
	var info_linha = $('#miolointerna > table > tbody > tr:nth-child(1) > td:nth-child(1) > table').eq(1).find('table');
	var linha = {
		numero: $('#miolointerna u').text().clearText().toUpperCase().replace("CONSULTA DE ITINERÁRIOS - LINHA ", ""),
		nome: nome,
		coordenador : {
			nome: info_linha.find('tr').eq(3).text().clearText(),
			telefone: $(info_linha).find('tr').eq(6).text().clearText(),
			email: $(info_linha).find('tr').eq(5).text().clearText(),
		},				
		ida: [],
		volta: []
	}

	var pontos_ida = $('div.TabbedPanelsContentVisible table').eq(0).find('tr');
	for(var i = 1; i < pontos_ida.length; i += 1) {
		var tds = $(pontos_ida[i]).find('td');
		var text = $(tds[0]).text().replace(":00", "") + " hs - " + $(tds[1]).text().toUpperCase() + " - " + $(tds[2]).text().toUpperCase();
		linha.ida.push(text.clearText());
	}

	var pontos_volta = $('div.TabbedPanelsContentVisible table').eq(1).find('tr');
	for(var i = 1; i < pontos_volta.length; i += 1) {
		var tds = $(pontos_volta[i]).find('td');
		var text = $(tds[0]).text().replace(":00", "") + " hs - " + $(tds[1]).text().toUpperCase() + " - " + $(tds[2]).text().toUpperCase();
		linha.volta.push(text.clearText());
	}

	return linha;
}

exports.getLinhas = function(associacao, fn) {
	var url = associacao.site + "home";

	common.httpGet(url).then(function (res) {
		res.setEncoding("binary");
		return common.loadBody(res).then(function (body) {
			var $ = cheerio.load(body);
			var linhas = $('#linhas').find('option');
			linhas = linhas.slice(1);
			var url_linhas = [];
			for(i = 0; i < linhas.length; i += 1) {
				var url_linha = associacao.site + "linha/" + $(linhas[i]).attr('value');
				url_linhas.push({promise: common.httpGet(url_linha).then(function (res) {
					res.setEncoding("binary");
					return common.loadBody(res);
				}), nome: $(linhas[i]).text() });
			}
			return url_linhas;
		});

	}).then(function (url_linhas) {		
		var promises = [];
		for(i = 0; i < url_linhas.length; i += 1) {
			promises.push(url_linhas[i].promise);
		}
		Q.all(promises).spread(function () {
			associacao.linhas = [];
			for(i = 0; i < arguments.length; i += 1) {
				associacao.linhas.push(getLinha(arguments[i], url_linhas[i].nome));
			}

		}).done(function () {
			fn(associacao);
		});

	});
}