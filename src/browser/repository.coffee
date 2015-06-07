ipc = require 'ipc'

_ = require 'lodash'
Q = require 'q'
lowdb = require 'lowdb'

github = require './github'

db = lowdb('db.json')('repos')

module.exports = (->
  projects = []
  {
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
    events: (sinceId) ->
      deferred = Q.defer()
      sinceId = sinceId || Infinity

      Q.all(
        github.repoEvents(p.owner, p.repo, p.nextPage) for p in projects when (
          db.chain().where({repo: {name: "#{p.owner}/#{p.repo}"}})
            .filter((o) -> o.id<sinceId).value().length <github.pageSize/4
        )
      ).then (result) ->
        db.push e for e in d.body when e.type isnt 'ForkEvent' and e.type isnt 'WatchEvent' for d in result
        p.nextPage = (p.nextPage || 1) + 1 for p in projects
        deferred.resolve()
      .catch () ->
        deferred.reject e
      deferred.promise
    timeline: (sinceId)->
      deferred = Q.defer()
      sinceId = sinceId || Infinity
      @events(sinceId).then () ->
        list = db.chain().filter((o)-> o.id<sinceId).sortBy('created_at').reverse().take(github.pageSize/4).value()
        deferred.resolve(list)
      .catch () ->
        deferred.reject e
      deferred.promise
  }
)()
