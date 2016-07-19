const path = require('path');
const nconf = require('nconf');
nconf.file('config.json');
nconf.defaults({
  'port': '9999',
  'headersFolderLocation': './headers',
  'userResponseHeadersFile': 'userResponseHeaders.json'
});

module.exports = function loadConfigs() {
  const baseLoc = process.env.PWD;
  const headersFolderLoc = nconf.get('headersFolderLocation');
  const userResponseHeadersFile = nconf.get('userResponseHeadersFile');
  nconf.set('userResponseHeadersFile', path.join(baseLoc, headersFolderLoc, userResponseHeadersFile));
};
