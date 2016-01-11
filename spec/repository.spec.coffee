fs = require 'fs'
db = require '../src/browser/store'
repo = require '../src/browser/repository'
github = require '../src/browser/github'
should = require 'should'

describe 'Repository', ->
  timelineSize = github.pageSize / 4
  before ->
    github.token fs.readFileSync('./spec/.token').toString()

  after (done) ->
    db.watch.remove {}, {multi: true}, (err, num) ->
      done err

  describe "watch", ->
    beforeEach (done) ->
      db.watch.remove {}, {multi: true}, (err, num) ->
        done err

    it "should add a project I watched", (done) ->
      p = {repo: 'nodejs/node'}
      repo.watch p, (err, list) ->
        return done err if err
        list.length.should.be.equal 1
        list[0].repo.should.be.equal p.repo
        done()
    it "should add two project I watched", (done) ->
      repo.watch {repo: 'nodejs/node'}, (err, list) ->
        return done err if err
        repo.watch {repo: 'Automattic/socket.io'}, (err, list) ->
          return done err if err
          list.length.should.be.equal 2
          done()
    it "should not add a project that already exist", (done) ->
      repo.watch {repo: 'nodejs/node'}, (err, list) ->
        return done err if err
        list.length.should.be.equal 1
        repo.watch {repo: 'nodejs/node'}, (err, list) ->
          err.errorType.should.be.equal 'uniqueViolated'
          done()

  describe "unwatch", ->
    beforeEach (done) ->
      db.watch.remove {}, {multi: true}, (err, num) ->
        done err

    it "should remove a project I want to unwatch", (done) ->
      p = {repo: 'nodejs/node'}
      repo.watch p, (err, list) ->
        return done err if err
        list.length.should.be.equal 1

        repo.unwatch p, (err, list) ->
          return done err if err
          list.length.should.be.equal 0
          done()

    it "should remove the project among multiple projects", (done) ->
      repo.watch {repo: 'nodejs/node'}, (err, list) ->
        return done err if err
        repo.watch {repo: 'summernote/summernote'}, (err, list) ->
          return done err if err
          repo.watch {repo: 'facebook/react'}, (err, list) ->
            return done err if err
            list.length.should.be.equal 3

            repo.unwatch {repo: 'summernote/summernote'}, (err, list) ->
              return done err if err
              list.length.should.be.equal 2
              done()

    it "should remove timeline of the project unwatched", (done) ->
      repo.watch {owner: 'nodejs', repo: 'node'}
      repo.watch {owner: 'summernote', repo: 'summernote'}
      repo.events().then () ->
        nodeEvents = repo.repoEventDB.chain().where({repo: {name: 'nodejs/node'}}).value()
        snEvents = repo.repoEventDB.chain().where({repo: {name: 'summernote/summernote'}}).value()
        nodeEvents.length.should.be.above(0)
        snEvents.length.should.be.above(0)

        repo.unwatch {owner: 'summernote', repo: 'summernote'}
        nodeEvents = repo.repoEventDB.chain().where({repo: {name: 'nodejs/node'}}).value()
        snEvents = repo.repoEventDB.chain().where({repo: {name: 'summernote/summernote'}}).value()
        nodeEvents.length.should.be.above(0)
        snEvents.should.have.length(0)
        done()
      .catch(done)

  describe "timeline", ->
    beforeEach ->
      repo.repoEventDB.remove()
      repo.unwatchAll()
      repo.watch {owner: 'nodejs', repo: 'node'}
      repo.watch {owner: 'jquery', repo: 'jquery'}

    it "should return timeline watched", ->
      repo.timeline().then (list) ->
        list.length.should.be.equal(timelineSize)

    it "should return timeline since id", ->
      repo.timeline().then (list) ->
        list[0].isOld = true
        repo.timeline(list[timelineSize-1].id).then (list) ->
          list.length.should.be.equal(timelineSize)
          list[0].should.not.have.property('isOld');

    it "should return next timeline since id", ->
      repo.timeline().then (list) ->
        list[0].isOld = true
        repo.timeline(list[timelineSize-1].id).then (list) ->
          repo.timeline(list[timelineSize-1].id).then (list) ->
            repo.timeline(list[timelineSize-1].id).then (list) ->
              list.length.should.be.equal(timelineSize)
              list[0].should.not.have.property('isOld');

    it "should return new timeline when sinceId is not passed", ->
      repo.timeline().then (list) ->
        list[0].isOld = true
        repo.timeline().then (list) ->
          list[0].should.not.have.property('isOld');
