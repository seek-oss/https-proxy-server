'use strict';
const loadConfig = require('./config');
loadConfig();
const startProxy = require('./proxy-server');
const proxyServer = startProxy();
console.log('STARTING SERVER');
process.on('SIGINT', function() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  proxyServer.shutdown(function() {
    console.log('Everything is cleanly shutdown.');
    process.exit();
  });
});
