'use strict';

var request = require('request'),
    Q = require('q');

var req = function(options) {
  var deferred = Q.defer();
  request(options, function(err, res, body) {
    if (err) { return deferred.reject(); }
    try {
      if (res.statusCode !== 200) { return deferred.reject(JSON.parse(body));}
      deferred.resolve({
        res: res,
        body: JSON.parse(body)
      });
    } catch(e) { deferred.reject(e); }
  });
  return deferred.promise;
};

module.exports = (function() {
  var TOKEN = '';

  var url = function(path) {
    return 'https://api.github.com' + path;
  };

  var headers = function() {
    // user-agent required
    // https://developer.github.com/v3/#user-agent-required
    return {
      'User-Agent': 'Involved-App',
      'Authorization': 'token ' + TOKEN
    };
  };

  return {
    pageSize: 60,
    setToken: function(t) {
      TOKEN = t;
      return TOKEN;
    },
    me: function() {
      return req({
        url: url('/user'),
        headers: headers()
      });
    },
    user: function(username) {
      return req({
        url: url('/users/'+username),
        headers: headers()
      });
    },
    repoEvents: function(owner, repo, page) {
      return req({
        url: url('/repos/'+owner+'/'+repo+'/events'),
        headers: headers(),
        qs: {
          page: page || 1,
          'per_page': this.pageSize
        }
      });
    },
    emojis: function() {
      return req({
        url: url('/emojis'),
        headers: headers()
      });
    }
  };
})();
