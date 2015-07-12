'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineSchema = new Schema({
  _id: String,
  company_id: String,
  nome: String,
  numero: String,
  coordenador: {
  	nome: String,
  	telefone: String,
  	email: String
  },
  ida: [String],
  volta: [String]
});

module.exports = mongoose.model('Line', LineSchema);