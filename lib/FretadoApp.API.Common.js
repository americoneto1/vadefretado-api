
var Q = require('q');
var http = require('http');

exports.httpGet = function (opts) {
     var deferred = Q.defer();
     http.get(opts, deferred.resolve);
     return deferred.promise;
};

exports.loadBody = function (res) {
  var deferred = Q.defer();

  var data = [];
  var datalen = 0;

  res.on('data', function(chunk) {
    data.push(chunk);
    datalen += chunk.length;
  });

  res.on('end', function() {
    var body = new Buffer(datalen);
    for (var i = 0, pos = 0; i < data.length; i++) {
      data[i].copy(body, pos);
      pos += data[i].length;
    }
    deferred.resolve(body);
  });

  return deferred.promise;
};

if (!String.prototype.clearText) {
  String.prototype.clearText = function () {
    var tmp = this.replace(/^\s+|\s+$/g, '');
    tmp = tmp.replace(/\t/g, '');
    tmp = tmp.replace(/\r/g, '');
    tmp = tmp.replace(/\n/g, '');  
    tmp = tmp.replace(/\u00a0/g, ' ');
    tmp = tmp.replace(/\s+/g, ' ');
    return tmp;
  };
}

if (!Array.prototype.getUnique) {
	Array.prototype.getUnique = function(){
	   var u = {}, a = [];
	   for(var i = 0, l = this.length; i < l; ++i){
	      if(u.hasOwnProperty(this[i])) {
	         continue;
	      }
	      a.push(this[i]);
	      u[this[i]] = 1;
	   }
	   return a;
	}
}