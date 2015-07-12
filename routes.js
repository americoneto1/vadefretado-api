/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  var companies = require('./api/companies');
  var lines = require('./api/lines');
  var search = require('./api/search');

  app.get('/api/v1/companies', companies.all);
  app.get('/api/v1/companies/:id', companies.byId);
  app.get('/api/v1/companies/:id/lines', lines.all);
  app.get('/api/v1/companies/:id/lines/:idLine', lines.byId);
  app.get('/api/v1/lines/:idLine', lines.byId);
  app.get('/api/v1/search', search.by);

};
