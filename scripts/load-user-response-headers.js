const userResponseHeadersFileLocation = process.env.npm_package_config_userResponseHeadersFile;
const defaultUserResponseHeadersFile = './../headers/userResponseHeaders0.json';
const userResponseHeadersFile = userResponseHeadersFileLocation !== undefined ? userResponseHeadersFileLocation : defaultUserResponseHeadersFile;

module.exports = function loadUserResponseHeaders(){
   return require(userResponseHeadersFile);

};
