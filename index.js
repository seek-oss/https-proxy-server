'use strict';
const startProxy = require('./proxy-server');
const proxyServer = startProxy();

console.log('Start App');
process.on('SIGINT', function() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  proxyServer.shutdown(function() {
    console.log('Everything is cleanly shutdown.');
    process.exit();
  });
});
