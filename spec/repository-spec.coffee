repo = require '../src/browser/repository'

describe 'Repository', ->

  describe "watch", ->
    beforeEach ->
      repo.unwatchAll()

    it "should add a project I watched", ->
      p = {owner: 'iojs', repo: 'io.js'}
      result = repo.watch p
      result.length.should.be.equal 1
      result[0].owner.should.be.equal p.owner
    it "should add two project I watched", ->
      repo.watch {owner: 'iojs', repo: 'io.js'}
      result = repo.watch {owner: 'Automattic', repo: 'socket.io'}
      result.length.should.be.equal 2

  describe "unwatch", ->
    beforeEach ->
      repo.unwatchAll()

#    it "should remove a project I want to unwatch", ->
#      p = {owner: 'iojs', repo: 'io.js'}
#      result = repo.watch p
#      result.length.should.be.equal 1
#
#      result = repo.unwatch p
#      result.length.should.be.equal 0

    it "should remove a project among multiple projects", ->
      repo.watch {owner: 'iojs', repo: 'io.js'}
      repo.watch {owner: 'summernote', repo: 'summernote'}
      result = repo.watch {owner: 'facebook', repo: 'react'}
      result.length.should.be.equal 3

      result = repo.unwatch {owner: 'summernote', repo: 'summernote'}
      result.length.should.be.equal 2
