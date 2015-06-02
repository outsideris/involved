require('./ipc-mock')()

github = require '../src/browser/github'
should = require 'should'

describe 'Github API', ->
  describe "setToken", ->
    it "should save token", ->
      t = github.setToken 'newToken'
      t.should.be.equal 'newToken'

  describe "me", ->
    it "should return my info", (done) ->
      result = null
      github.me().then (d) ->
        d.body.login.should.be.equal 'outsideris'
        done()
      .catch done

  describe "user", ->
    it "should return specific user info", (done) ->
      github.user('github').then (d) ->
        d.body.name.should.be.equal 'GitHub'
        done()
      .catch done

  describe "repoEvents", ->
    it "should return repository info", (done) ->
      github.repoEvents('jquery', 'jquery').then (d) ->
        (d.body.length > 0).should.be.ok
        d.body[0].should.have.property 'type'
        done()
      .catch done

    it "should return 10 events", (done) ->
      github.repoEvents('jquery', 'jquery').then (d) ->
        d.body.length.should.be.equal 10
        done()
      .catch done
