var request = require('request'),
    Q = require('q');

var req = function(options) {
  var deferred = Q.defer();
  request(options, function(err, res, body) {
    if (err) { return deferred.reject(); }
    try {
      deferred.resolve({
        res: res,
        body: JSON.parse(body)
      });
    } catch(e) { deferred.reject(e) }
  });
  return deferred.promise;
}

module.exports = (function() {
  var origin = 'https://api.github.com'
  var TOKEN = ''

  // user-agent required
  // https://developer.github.com/v3/#user-agent-required
  return {
    pageSize: 60,
    setToken: function(t) {
      return TOKEN = t
    },
    me: function() {
      return req({
        url: origin + '/user',
        headers: {
          'User-Agent': 'Involved-App',
          'Authorization': 'token ' + TOKEN
        }
      });
    },
    user: function(username) {
      return req({
        url: origin+'/users/'+username,
        headers: {
          'User-Agent': 'Involved-App',
          'Authorization': 'token ' + TOKEN
        }
      });
    },
    repoEvents: function(owner, repo, page) {
      return req({
        url: origin+'/repos/'+owner+'/'+repo+'/events',
        headers: {
          'User-Agent': 'Involved-App',
          'Authorization': 'token ' + TOKEN
        },
        qs: {
          page: page || 1,
          per_page: this.pageSize
        }
      });
    }
  };
})();
