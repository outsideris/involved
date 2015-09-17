require('./ipc-mock')()

fs = require 'fs'
repo = require '../src/browser/repository'
github = require '../src/browser/github'
should = require 'should'

describe 'Repository', ->
  timelineSize = github.pageSize / 4
  before ->
    github.token fs.readFileSync('./spec/.token').toString()

  after ->
    repo.unwatchAll()

  describe "watch", ->
    beforeEach ->
      repo.unwatchAll()

    it "should add a project I watched", ->
      p = {owner: 'nodejs', repo: 'node'}
      result = repo.watch p
      result.length.should.be.equal 1
      result[0].owner.should.be.equal p.owner
    it "should add two project I watched", ->
      repo.watch {owner: 'nodejs', repo: 'node'}
      result = repo.watch {owner: 'Automattic', repo: 'socket.io'}
      result.length.should.be.equal 2
    it "should not add a project that already exist", ->
      repo.watch {owner: 'nodejs', repo: 'node'}
      result = repo.watch {owner: 'nodejs', repo: 'node'}
      result.length.should.be.equal 1

  describe "unwatch", ->
    beforeEach ->
      repo.unwatchAll()

    it "should remove a project I want to unwatch", ->
      p = {owner: 'nodejs', repo: 'node'}
      result = repo.watch p
      result.length.should.be.equal 1

      result = repo.unwatch p
      result.length.should.be.equal 0

    it "should remove the project among multiple projects", ->
      repo.watch {owner: 'nodejs', repo: 'node'}
      repo.watch {owner: 'summernote', repo: 'summernote'}
      result = repo.watch {owner: 'facebook', repo: 'react'}
      result.length.should.be.equal 3

      result = repo.unwatch {owner: 'summernote', repo: 'summernote'}
      result.length.should.be.equal 2

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

  describe "events", ->
    beforeEach ->
      repo.repoEventDB.remove()
      repo.unwatchAll()
      repo.watch {owner: 'nodejs', repo: 'node'}
      repo.watch {owner: 'jquery', repo: 'jquery'}

    it "should return timeline of repositories", (done) ->
      repo.events().then () ->
        (repo.repoEventDB.size() > timelineSize).should.be.ok;
        repo.repoEventDB.find().should.have.property('type')
        repo.repoEventDB.find().should.have.property('payload')
        done()
      .catch done

  describe "timeline", ->
    beforeEach ->
      repo.repoEventDB.remove()
      repo.unwatchAll()
      repo.watch {owner: 'nodejs', repo: 'node'}
      repo.watch {owner: 'jquery', repo: 'jquery'}

    it "should return timeline watched", (done) ->
      repo.timeline().then (list) ->
        list.length.should.be.equal(timelineSize);
        done()
      .catch done

    it "should return timeline since id", (done) ->
      repo.timeline().then (list) ->
        repo.timeline(list[timelineSize-1].id).then (list) ->
          list.length.should.be.equal(timelineSize);
          done()
      .catch done
