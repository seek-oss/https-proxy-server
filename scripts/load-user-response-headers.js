var nconf = require('nconf');
require('./../config');
const responseHeaderFile = nconf.get('userResponseHeadersFile');

module.exports = function loadUserResponseHeaders(){
   return require(responseHeaderFile);
};
