'use strict';

const nconf = require('nconf');
const http = require('http');
const net = require('net');
const urlParser = require('url');
const loadConfig = require('./config');
loadConfig();
const userResponseHeadersLoader = require('./scripts/load-user-response-headers');
const userResponseHeaders = userResponseHeadersLoader();
require('http-shutdown').extend();

function parseUrlFromString(url, defaultPort) {
  const parsedUrl = urlParser.parse(url);
  const host = parsedUrl.hostname;
  let port = parsedUrl.port === null ? defaultPort : parsedUrl.port;
  port = parseInt(port, 10);
  const path = parsedUrl.path;
  console.log(url);
  return { host, port, path };
}

function httpsUserRequestHandler(userRequest, requestSocket, bodyhead) {
  const url = userRequest.url;
  const httpVersion = userRequest.httpVersion;
  const urlObj = parseUrlFromString(`https://${url}!`, 443);

  const proxySocket = new net.Socket({});

  proxySocket.connect(urlObj.port, urlObj.host, function() {
    requestSocket.write(`HTTP/${httpVersion} 200 Connection established OK!\r\n\r\n`);
  });

  proxySocket.on('data', function(chunk) {
    requestSocket.write(chunk);
  });

  proxySocket.on('end', function() {
    requestSocket.end();
  });

  requestSocket.on('data', function(chunk) {
    proxySocket.write(chunk);
  });

  requestSocket.on('end', function() {
    proxySocket.end();
  });

  proxySocket.on('error', function(error) {
    requestSocket.write(`HTTP/'${httpVersion} 500 Connection error\r\n\r\n`);
    console.log(`ERROR ON PROXY SOCKET - {error}`);
    requestSocket.end();
  });

  requestSocket.on('error', function(error) {
    console.log(`ERROR ON REQUEST SOCKET - ${error}`);
    proxySocket.end();
  });
}

function httpUserRequestHandler(userRequest, userResponse) {
  const host = userRequest.headers.host;
  const urlObj = parseUrlFromString(`http://${host}`, 80);
  const path = parseUrlFromString(userRequest.url).path;

  const options = {
    'headers': userRequest.headers,
    'method': userRequest.method,
    'host': urlObj.host,
    'port': urlObj.port,
    path,
    'agent': userRequest.agent,
    'auth': userRequest.auth
  };

  const proxyRequest = http.request(options, function(proxyResponse) {
    const body = [];
    userResponseHeaders.forEach(function(header) {
      userResponse.setHeader(header.name, header.value);
    });

    const headers = proxyResponse.headers;
    userResponse.writeHead(
      proxyResponse.statusCode,
      headers
    );

    proxyResponse.on('data', function(chunk) {
      body.push(chunk);
    });

    proxyResponse.on('end', function() {
      const data = Buffer.concat(body);
      const modifiedBody = data;
      userResponse.end(modifiedBody);
    });
  }
  );

  proxyRequest.on('error', function(err) {
    userResponse.writeHead(500);
    userResponse.write(
      `<h1>Error 500</h1>
      <p>Error Occured </br> ${err} </br>
      </body></html>`
    );
    userResponse.end();
  });

  userRequest.addListener('data', function(chunk) {
    proxyRequest.write(chunk);
  });

  userRequest.addListener('end', function() {
    proxyRequest.end();
  });
}

module.exports = function startProxy() {
  const port = nconf.get('proxyPort');

  console.log(`Starting proxy server on port ${port}`);

  const server = http
                .createServer(httpUserRequestHandler)
                .listen(port)
                .withShutdown();

  server.addListener('connect', httpsUserRequestHandler);
  return server;
};
