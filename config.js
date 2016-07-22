'use strict';
const path = require('path');
const nconf = require('nconf');
nconf.file('config.json');
nconf.defaults({
  'proxySettings': {
    'port': '7777',
    'headersFolderLocation': './headers',
    'userResponseHeadersFile': 'userResponseHeaders.json',
    'debug': false
  }
});

module.exports = class Config {
  constructor() {
    const baseLoc = process.env.PWD;
    const headersFolderLoc = nconf.get('proxySettings:headersFolderLocation');
    const userResponseHeadersFileName = nconf.get('proxySettings:userResponseHeadersFile');

    const _userResponseHeadersFile = path.join(baseLoc, headersFolderLoc, userResponseHeadersFileName);
    const _proxyPort = nconf.get('proxySettings:port');
    const _debug = nconf.get('proxySettings:debug');

    this.getProxyPort = function() {
      return _proxyPort;
    };

    this.getUserResponseHeadersFile = function() {
      return _userResponseHeadersFile;
    };

    this.isDebugSet = function() {
      return _debug;
    };
  }
};
