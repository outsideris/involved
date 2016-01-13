fs = require 'fs'
db = require '../src/browser/store'
repo = require '../src/browser/repository'
github = require '../src/browser/github'
should = require 'should'

describe 'Repository', ->
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
      repo.watch {repo: 'atom/electron'}, (err, docs) ->
        repo.makeTimeline null, ->
          db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
            docs.length.should.above 0
            repo.unwatch {repo: 'atom/electron'}, (err, docs) ->
              db.watch.find {repo:'atom/electron'}, (err, docs) ->
                docs.should.have.length 0
                db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
                  docs.should.have.length 0
                  done()

  describe "fetchEventsAndSave", ->
    beforeEach (done) ->
      db.watch.remove {}, {multi: true}, (err, num) ->
        done err if err
        db.watch.insert {repo:'atom/electron', type:'repo'}, (err, docs) ->
          done err if err
          db.repos.remove {}, {multi: true}, (err, num) ->
            done err

    it "should events of the repo and save it", (done)->
      repo.fetchEventsAndSave 'atom/electron', false, (err, docs) ->
        db.repos.find {}, (err, docs) ->
          docs.length.should.above(repo.timelineSize)
          done()

    it "should keep current page number", (done)->
      repo.fetchEventsAndSave 'atom/electron', false, (err, docs) ->
        db.watch.find {repo:'atom/electron', type:'repo'}, (err, docs) ->
          docs[0].page.should.equal 1
          done()

    it "should not save duplicated events", (done)->
      repo.fetchEventsAndSave 'atom/electron', false, (err, docs) ->
        db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
          oldSize = docs.length
          db.watch.update {repo: 'atom/electron', type:'repo'}, {$set: {page: 0}}, (err, numReplaced) ->
            repo.fetchEventsAndSave 'atom/electron', false, (err, docs) ->
              db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
                docs.should.have.length oldSize
                done()

    it "should fetch newest events if isNew flag is true", (done)->
      repo.fetchEventsAndSave 'atom/electron', false, (err, docs) ->
        db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
          oldSize = docs.length
          repo.fetchEventsAndSave 'atom/electron', true, (err, docs) ->
            db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
              docs.should.have.length oldSize
              done()

  describe "makeTimeline", ->
    beforeEach (done) ->
      db.watch.remove {}, {multi: true}, (err, num) ->
        done err if err
        db.repos.remove {}, {multi: true}, (err, num) ->
          done err if err
          db.watch.insert [{repo:'nodejs/node', type:'repo'}, {repo:'atom/electron', type:'repo'}], (err, docs) ->
            done err

    it "should save events of repositories that watched", (done) ->
      repo.makeTimeline null, ->
        db.repos.find {'repo.name':'nodejs/node'}, (err, docs) ->
          done err if err
          docs.length.should.above repo.timelineSize
          db.repos.find {'repo.name':'atom/electron'}, (err, docs) ->
            docs.length.should.above repo.timelineSize
            done err

    it "should not fetch if events already are exist enough", (done) ->
      repo.makeTimeline null, ->
        db.repos.find {'repo.name':'nodejs/node'}, (err, docs) ->
          done err if err
          oldSize = docs.length
          repo.makeTimeline null, ->
            db.repos.find {'repo.name':'nodejs/node'}, (err, docs) ->
              docs.should.have.length oldSize
              done err
