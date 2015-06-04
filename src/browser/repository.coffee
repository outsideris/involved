ipc = require 'ipc'

_ = require 'lodash'
Q = require 'q'
lowdb = require 'lowdb'

github = require './github'

db = lowdb('db.json')('repos')

module.exports = (->
  projects = []
  repos =
    db: db
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
    events: ->
      deferred = Q.defer()
      Q.all(github.repoEvents(p.owner, p.repo) for p in projects).then (result) ->
        db.push e for e in d.body when e.type isnt 'ForkEvent' and e.type isnt 'WatchEvent' for d in result
        deferred.resolve()
      .catch () ->
        deferred.reject e
      deferred.promise
)()
