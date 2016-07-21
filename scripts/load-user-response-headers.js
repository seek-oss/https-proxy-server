'use strict';
const nconf = require('nconf');
const config = require('./../config');
const responseHeaderFile = new config().getUserResponseHeadersFile();

module.exports = function loadUserResponseHeaders(){
   return require(responseHeaderFile);
};
