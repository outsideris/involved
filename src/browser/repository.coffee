ipc = require 'ipc'

_ = require 'lodash'
Q = require 'q'

github = require './github'

module.exports = (->
  projects = []

  {
    watch: (p) ->
      projects.push p if p?.owner? and p.repo?
      projects
    unwatch: (p) ->
      if p?.owner? and p.repo?
        index = _.findIndex projects, (o) ->
          o.owner is p.owner and o.repo is p.repo
        projects[index...index+1] = [] if ~index
      projects
    unwatchAll: ->
      projects = []
    events: (p) ->
      github.repoEvents(p.owner, p.repo).then (res) ->
        JSON.parse res[0].body
      .catch() if p?.owner? and p.repo?
  }
)()
