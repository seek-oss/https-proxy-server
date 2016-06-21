var http = require('http');
var net = require('net');
var urlParser = require('url');
require('http-shutdown').extend();

function parseUrlFromString( url, defaultPort ) {
  var parsedUrl = urlParser.parse(url);
  var host = parsedUrl['hostname'];
  var port = parsedUrl['port'] === null ? defaultPort : parsedUrl['port'];
  var path = parsedUrl['path'];
  console.log(url);
  return { 'host': host, 'port':port, 'path':path } ;
}

function httpsUserRequestHandler( userRequest, requestSocket, bodyhead ) {
  var url = userRequest['url'];
  var httpVersion = userRequest['httpVersion'];
  var urlObj = parseUrlFromString( "https://" + url, 443 );

  var proxySocket = new net.Socket({});

  proxySocket.connect(parseInt( urlObj.port ), urlObj.host, function () {
    requestSocket.write( "HTTP/" + httpVersion + " 200 Connection established OK!\r\n\r\n" );
  });

  proxySocket.on('data', function ( chunk ) {
    requestSocket.write( chunk );
  });

  proxySocket.on('end',function () {
    requestSocket.end();
  });

  requestSocket.on('data',function ( chunk ) {
    proxySocket.write( chunk );
  });

  requestSocket.on('end', function () {
    proxySocket.end();
  });

  proxySocket.on('error', function ( err ) {
    requestSocket.write( "HTTP/" + httpVersion + " 500 Connection error\r\n\r\n" );
    console.log( 'ERROR ON PROXY SOCKET - ', err );
    requestSocket.end();
  });

  requestSocket.on('error', function ( err ) {
    console.log( 'ERROR ON REQUEST SOCKET - ', err );
    proxySocket.end();
  });
}

function httpUserRequestHandler( userRequest, userResponse ) {
  var host = userRequest.headers['host'];
  var urlObj = parseUrlFromString("http://" + host, 80 );
  var path = parseUrlFromString(userRequest.url).path;

  var options = {
    'headers': userRequest.headers,
    'method': userRequest.method,
    'host': urlObj.host,
    'port': urlObj.port,
    'path': path,
    'agent': userRequest.agent,
    'auth': userRequest.auth
  };

  var proxyRequest = http.request(options,function ( proxyResponse ) {
    var body = [];
    var headers = proxyResponse.headers;
    userResponse.writeHead(
      proxyResponse.statusCode,
      headers
    );

    proxyResponse.on('data',function (chunk) {
      body.push(chunk);
    });

    proxyResponse.on('end',function () {
      var data  = Buffer.concat(body);
      var modifiedBody = data;
      userResponse.end(modifiedBody);
      });
    }
  );

  proxyRequest.on('error',function ( err ) {
    userResponse.writeHead( 500 );
    userResponse.write(
      "<h1>Error 500</h1>" +
      "<p>Error Occured </br>" + err + "</br>" +
      "</body></html>"
    );
    userResponse.end();
  });

  userRequest.addListener('data',function (chunk) {
    proxyRequest.write( chunk );
  });

  userRequest.addListener('end',function () {
    proxyRequest.end();
  });
}

module.exports =  function startProxy() {
  var port = 9998;

  console.log( 'Starting proxy server on port ' + port );

  var server = http
                .createServer( httpUserRequestHandler )
                .listen(port)
                .withShutdown();

  server.addListener('connect',httpsUserRequestHandler);
  return server;
}
