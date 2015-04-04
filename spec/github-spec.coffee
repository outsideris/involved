github = require '../src/browser/github'
should = require 'should'

describe 'Github API', ->

  describe "setToken", ->
    it "should save token", ->
      t = github.setToken 'newToken'
      t.should.be.equal 'newToken'

  describe "me", ->
    it "should return my info", () ->
      result = null
      github.me (err, res, body) ->
        result = JSON.parse body

      waitsFor (->
        !!result
      ), 3000

      runs ->
        result.login.should.be.equal 'outsideris'

  describe "repoEvents", ->
    it "should return repository info", () ->
      result = null
      github.repoEvents 'jquery', 'jquery', (err, res, body) ->
        result = JSON.parse body

      waitsFor (->
        !!result
      ), 3000

      runs ->
        (result.length > 0).should.be.ok
        result[0].should.have.property 'type'

    it "should return 10 events", () ->
      result = null
      github.repoEvents 'jquery', 'jquery', (err, res, body) ->
        result = JSON.parse body

      waitsFor (->
        !!result
      ), 3000

      runs ->
        result.length.should.be.equal 10
