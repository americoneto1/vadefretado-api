
var common = require('./FretadoApp.API.Common');
var cheerio = require('cheerio');
var Q = require('q');

function getLinha(body) {
	var $ = cheerio.load(body);
	var linha = {
		numero: $('div').find('span').eq(0).text().clearText().replace("Linha ", ""),  
		nome: $('div').find('strong').eq(0).html().clearText().replace("<br>", " / "),
		coordenador : {},				
		ida: [],
		volta: []
	}
	//console.log('type: ', $('div').find('strong').eq(3).prev()['0'].prev.data);
	return linha;
}

exports.getLinhas = function(associacao, fn) {
	var url = associacao.site + "servicos/transporte2.php";

	common.httpGet(url).then(function (res) {		
		res.setEncoding("binary");
		return common.loadBody(res).then(function (body) {
			var $ = cheerio.load(body);
			var linhas = $('body > div');
			for(i = 0; i < linhas.length; i += 1) {
				associacao.linhas.push(getLinha($(linhas[i]).html()));
			}
			fn(associacao);
		});
	});
}