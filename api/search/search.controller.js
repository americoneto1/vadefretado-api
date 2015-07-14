'use strict';

var _ = require('lodash');
var Company = require('../companies/companies.model');
var Line = require('../lines/lines.model');
var Q = require('q');

exports.by = function(req, res) {
  var origem = req.query.origem;
  var destino = req.query.destino;

  if(!origem || !destino) { return handleBadRequest(res); }

  Line.find({
    $or: [
      { nome: new RegExp(origem, 'i') },
      { nome: new RegExp(destino, 'i') },
      { ida: new RegExp(origem, 'i') },
      { volta: new RegExp(destino, 'i') },
    ]
  }).select('nome numero company_id').sort({ company_id: 1, numero: 1 }).exec(function (err, entities) {
    if(err) { return handleError(res, err); }

    var result = _.chain(entities)
      .groupBy('company_id')
      .pairs()
      .map(function (item) {
        return _.object(_.zip(["company", "lines"], item));
      })
      .value();

    var promises = [];
    for (var i = 0; i < result.length; i++) {
      promises.push(Company.find({_id: result[i].company}).exec());
    };

    Q.all(promises).spread(function() {
      for (var i = 0; i < result.length; i++) {
        result[i].company = arguments[i][0];
      };
      return res.json(200, result);
    });

  });

};

function handleError(res, err) {
  return res.send(500, err);
}

function handleBadRequest(res) {
  return res.send(400, "Origem e destino esperados para a busca");
}