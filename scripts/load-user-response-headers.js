var nconf = require('nconf');
const responseHeaderFile = nconf.get('userResponseHeadersFile');

module.exports = function loadUserResponseHeaders(){
   return require(responseHeaderFile);
};
