var _ = require('lodash');

module.exports = function loadUrls(location){
  var json = require(location);
  return _.map(json, function(elem){
    return elem;
  });
}
