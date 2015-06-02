ipc = require 'ipc'
request = require 'request'

Q = require 'q'

req = (options) ->
  deferred = Q.defer()
  request options, (err, res, body) ->
    return deferred.reject err if err?
    try
      deferred.resolve
        res: res
        body: JSON.parse body
    catch e then deferred.reject e
  deferred.promise

module.exports = (->
  origin = 'https://api.github.com'
  TOKEN = ''

  # user-agent required
  # https://developer.github.com/v3/#user-agent-required
  {
    setToken: (t) ->
      TOKEN = t
    me: () ->
      req
        url: "#{origin}/user"
        headers:
          'User-Agent': 'Involved-App'
          'Authorization': "token #{TOKEN}"
    user: (username) ->
      req
        url: "#{origin}/users/#{username}"
        headers:
          'User-Agent': 'Involved-App'
          'Authorization': "token #{TOKEN}"
    repoEvents: (owner, repo) ->
      req
        url: "#{origin}/repos/#{owner}/#{repo}/events"
        headers:
          'User-Agent': 'Involved-App'
          'Authorization': "token #{TOKEN}"
        qs:
          page: 1
          per_page: 10
  }
)()
