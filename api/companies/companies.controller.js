'use strict';

var Company = require('./companies.model');

exports.all = function(req, res) {
  Company.find({}).sort({ nome: 1 }).exec(function (err, entities) {
    if(err) { return handleError(res, err); }
    return res.json(200, entities);
  });
};

exports.byId = function(req, res) {
  Company.findById(req.params.id, function (err, entity) {
    if(err) { return handleError(res, err); }
    if(!entity) { return res.send(404); }
    return res.json(entity);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}