'use strict';
const nconf = require('nconf');
const Config = require('./../config');
const responseHeaderFile = new Config().getUserResponseHeadersFile();

module.exports = function loadUserResponseHeaders() {
  return require(responseHeaderFile);
};
