'use strict';

var request = require('request'),
    Q = require('q');

module.exports = (function() {
  var TOKEN = '';

  var url = function(path) {
    return 'https://api.github.com' + path;
  };

  var baseRequest = function() { console.log('The github token is absent.'); };
  var setBaseRequest = function() {
    baseRequest = request.defaults({
      // user-agent required
      // https://developer.github.com/v3/#user-agent-required
      headers: {
        'User-Agent': 'Involved-App',
        'Authorization': 'token ' + TOKEN
      }
    });
  };

  var req = function(options) {
    var deferred = Q.defer();
    baseRequest(options, function(err, res, body) {
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

  return {
    pageSize: 60,
    token: function(t) {
      if (typeof t === 'string') {
        TOKEN = t;
        setBaseRequest();
      }
      return TOKEN;
    },
    me: function() {
      return req({
        url: url('/user')
      });
    },
    user: function(username) {
      return req({
        url: url('/users/'+username)
      });
    },
    repoEvents: function(owner, repo, page) {
      return req({
        url: url('/repos/'+owner+'/'+repo+'/events'),
        qs: {
          page: page || 1,
          'per_page': this.pageSize
        }
      });
    },
    emojis: function() {
      return req({
        url: url('/emojis')
      });
    }
  };
})();
