ipc = require 'ipc'
request = require 'request'

module.exports = (->
  origin = 'https://api.github.com'
  TOKEN = ''

  # user-agent required
  # https://developer.github.com/v3/#user-agent-required
  {
    setToken: (t) ->
      TOKEN = t
    me: (cb) ->
      request {
        url: "#{origin}/user"
        headers:
          'User-Agent': 'Involved-App'
          'Authorization': "token #{TOKEN}"
      }, cb
    repoEvents: (owner, repo, cb) ->
      request {
        url: "#{origin}/repos/#{owner}/#{repo}/events"
        headers:
          'User-Agent': 'Involved-App'
          'Authorization': "token #{TOKEN}"
        qs:
          page: 1
          per_page: 10
      }, cb
  }
)()
