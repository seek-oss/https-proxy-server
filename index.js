var startProxy = require('./proxy-server');

var proxy = startProxy();

process.on( 'SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    proxy.shutdown(function() {
      console.log('Everything is cleanly shutdown.');
      process.exit( );
    });
})
