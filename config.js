const path = require('path');
const nconf = require('nconf');
nconf.file('config.json');
nconf.defaults({
  'proxySettings': {
    'port': '7777',
    'headersFolderLocation': './headers',
    'userResponseHeadersFile': 'userResponseHeaders.json'
  }
});

const baseLoc = process.env.PWD;
const headersFolderLoc = nconf.get('proxySettings:headersFolderLocation');
const userResponseHeadersFileName = nconf.get('proxySettings:userResponseHeadersFile');
const userResponseHeadersFile = path.join(baseLoc, headersFolderLoc, userResponseHeadersFileName);
const proxyPort = nconf.get('proxySettings:port');
console.log('User Response Header File - ', userResponseHeadersFile);
nconf.set('userResponseHeadersFile', userResponseHeadersFile);
console.log('Proxy port - ', proxyPort);
nconf.set('proxyPort', proxyPort);
