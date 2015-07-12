'use strict';

var Line = require('./lines.model');

exports.all = function(req, res) {
  Line.find({ company_id: req.params.id }, 'numero nome', function (err, entities) {
    if(err) { return handleError(res, err); }
    return res.json(200, entities);
  });
}

exports.byId = function(req, res) {
  Line.findById(req.params.idLine, function (err, entity) {
    if(err) { return handleError(res, err); }
    if(!entity) { return res.send(404); }
    return res.json(entity);
  });
}

function handleError(res, err) {
  return res.send(500, err);
}