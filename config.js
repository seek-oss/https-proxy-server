const defaultConfig = require('./default-config.json');
const path = require('path');
const nconf = require('nconf');
nconf.file('config.json');
nconf.defaults(defaultConfig);

const baseLoc = process.env.PWD;
const headersFolderLoc = nconf.get('proxySettings:headersFolderLocation');
const userResponseHeadersFileName = nconf.get('proxySettings:userResponseHeadersFile');
const userResponseHeadersFile = path.join(baseLoc, headersFolderLoc, userResponseHeadersFileName);
console.log(userResponseHeadersFile);
nconf.set('userResponseHeadersFile', userResponseHeadersFile);
nconf.set('proxyPort', nconf.get('proxySettings:port'));
