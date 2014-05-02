
var common = require('./FretadoApp.API.Common');
var cheerio = require('cheerio');
var Q = require('q');
var PDFParser = require("pdf2json/pdfparser");

PDFParser.prototype.linha = function(linha) {
	this.linha = linha;
};

PDFParser.prototype.arrPos = function(ida, volta) {
	this.arrPosIda = ida;
	this.arrPosVolta = volta;
};

var pdfParserLinha1 = new PDFParser();
pdfParserLinha1.linha = {
	numero: "01",
	nome: "Santos - Alphaville"
}
var arrPosIdaLinha1 = [6, 10, 14, 16, 20, 24, 28, 32, 34, 38, 
					   42, 44, 46, 50, 54, 58, 62, 66, 70, 74, 78, 
					   82, 86, 90, 94, 98, 102, 106, 110, 118, 122, 
					   126, 130, 134, 139, 141, 143, 145, 147];

var arrPosVoltaLinha1 = [8, 12, 18, 22, 26, 30, 36, 40, 48, 52, 
						 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 
						 96, 100, 104, 108, 112, 114, 116, 120, 
						 124, 128, 132, 136];

pdfParserLinha1.arrPos(arrPosIdaLinha1, arrPosVoltaLinha1);

var pdfParserLinha2 = new PDFParser();
pdfParserLinha2.linha = {
	numero: "02",
	nome: "Santos - Alphaville"
}
var arrPosIdaLinha2 = [6, 13, 17, 20, 28, 32, 35, 39, 43, 
					   45, 47, 51, 55, 59, 63, 67, 70, 74, 
					   78, 82, 86, 92, 96, 100, 104, 110, 
					   114, 118, 122, 129, 133, 135, 137, 
					   139, 141, 143, 145, 147, 149, 151];

var arrPosVoltaLinha2 = [8, 11, 15, 22, 26, 30, 37, 41, 49, 
						 53, 57, 65, 72, 76, 80, 84, 88, 94,
						 98, 102, 108, 112, 116, 120, 124, 126, 131];

pdfParserLinha2.arrPos(arrPosIdaLinha2, arrPosVoltaLinha2);

function getCoordenador() {
	return {
		nome: "Luiz Alberto",
		telefone: "(13) 7822-9644 / ID Nextel: 126*102987",
		email: "luiz_als@terra.com.br / 4253.lals@bradesco.com.br"
	}
}

function getItinerario(arr, domain) {
	var arrResult = [];
	for(var i = 0; i < arr.length; i++) {
		arrResult.push(decodeURIComponent(domain.data.Pages[0].Texts[arr[i] + 1].R[0].T) +" - "+ 
					   decodeURIComponent(domain.data.Pages[0].Texts[arr[i]].R[0].T));
	}	
	return arrResult;
}

exports.getLinhas = function(associacao, fn) {
	var url_linhas = [];
	url_linhas.push(common.httpGet(associacao.site + "PDF/Itinerario_Linha_01.pdf").then(common.loadBody));
	url_linhas.push(common.httpGet(associacao.site + "PDF/Itinerario_Linha_02.pdf").then(common.loadBody));
	
	Q.all(url_linhas).spread(function () {
		associacao.linhas = [];

		pdfParserLinha1.parseBuffer(arguments[0]);
		pdfParserLinha1.on("pdfParser_dataReady", function(domain) {
			this.linha.coordenador = getCoordenador();
			this.linha.ida = getItinerario(this.arrPosIda, domain);
			this.linha.volta = getItinerario(this.arrPosVolta, domain);
			associacao.linhas.push(this.linha);
		});

		pdfParserLinha2.parseBuffer(arguments[1]);
		pdfParserLinha2.on("pdfParser_dataReady", function(domain) {
			this.linha.coordenador = getCoordenador();
			this.linha.ida = getItinerario(this.arrPosIda, domain);
			this.linha.volta = getItinerario(this.arrPosVolta, domain);
			associacao.linhas.push(this.linha);
			fn(associacao);
		});

	}).done(function () {
		//fn(associacao);
	});
}