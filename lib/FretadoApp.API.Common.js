
var Q = require('q');
var http = require('http');
var entities = require('entities');

var convert = function(text) {
    return entities.decodeHTML(text);
}

exports.httpGet = function (opts) {
     var deferred = Q.defer();
     http.request(opts, deferred.resolve).end();
     return deferred.promise;
};

exports.loadBody = function (res) {
    var deferred = Q.defer();
    var body = "";
    
    res.on("data", function (chunk) {
        body += chunk;
    });
    res.on("end", function () {
        deferred.resolve(convert(body));
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