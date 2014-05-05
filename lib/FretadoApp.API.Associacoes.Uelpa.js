
var common = require('./FretadoApp.API.Common');
var Q = require('q');
var fs = require('fs');

exports.getLinhas = function(associacao, fn) {

	var data = [];
    data.push("uelpa_30.doc");
    data.push("uelpa_36.doc");
    data.push("uelpa_37.doc");
    data.push("uelpa_43.doc");
    data.push("uelpa_51.doc");
    data.push("uelpa_52.doc");
    data.push("uelpa_53.doc");
    data.push("uelpa_54.doc");
    data.push("uelpa_56.doc");
    data.push("uelpa_57.doc");
    data.push("uelpa_85.doc");
    data.push("uelpa_88.doc");
    data.push("uelpa_89.doc");

    fs.readFile('./lib/uelpa.json', function(err, data) {
    	var assoc = JSON.parse(data.toString('utf8'));
    	associacao.linhas = assoc.linhas;
    	fn(associacao);
    });
}