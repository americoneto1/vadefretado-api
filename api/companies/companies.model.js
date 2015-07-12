'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  _id: String,
  nome: String,
  endereco: String,
  telefone: String,
  email: String,
  site: String
});

module.exports = mongoose.model('Company', CompanySchema);