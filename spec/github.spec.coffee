fs = require 'fs'
should = require 'should'
rewire = require 'rewire'
Q = require 'q'

github = rewire '../src/browser/github'

fixtureGithubRepoEventPage1 = require './fixture/github-api-repos-events-node-page1.json'
fixtureGithubRepoEventPage2 = require './fixture/github-api-repos-events-node-page2.json'
fixtureGithubRepoEventPage1new = require './fixture/github-api-repos-events-node-page1-new.json'

tokenFixture = fs.readFileSync('./spec/.token').toString()

enableGithubMock = true

describe 'Github API', ->
  beforeEach ->
    github.token tokenFixture

  describe "setToken", ->
    it "should return token", ->
      github.token 'new-token'
      github.token().should.be.equal 'new-token'

    it "should save token", ->
      t = github.token 'newToken'
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
    rollbackReq = null
    originalReq = github.__get__ 'req'

    beforeEach ->
      (rollbackReq = github.__set__ 'req', ->
        deferred = Q.defer()
        setTimeout (->
          deferred.resolve fixtureGithubRepoEventPage1
        ), 300
        deferred.promise) if enableGithubMock
    afterEach ->
      rollbackReq = null
    after ->
      github.__set__ 'req', originalReq

    it "should return events of the repository", ->
      github.repoEvents('nodejs/node').then (d) ->
        d.body.length.should.equal github.pageSize
        d.body[0].should.have.property 'type'
        d.body[0].should.have.property 'payload'

    it "should return next page for events of the repository", ->
      (rollbackReq = github.__set__ 'req', ->
        deferred = Q.defer()
        setTimeout (->
          deferred.resolve fixtureGithubRepoEventPage2
        ), 300
        deferred.promise) if enableGithubMock

      github.repoEvents('nodejs/node', 2).then (d) ->
        d.body.length.should.equal github.pageSize
        d.body[0].should.have.property 'type'
        d.body[0].should.have.property 'payload'

    it "should return polling interval in headers", ->
      github.repoEvents('nodejs/node').then (d) ->
        d.res.headers['x-poll-interval'].should.equal '60'

    it "should return ratelimit in headers", ->
      github.repoEvents('nodejs/node').then (d) ->
        (+d.res.headers['x-ratelimit-remaining']).should.above 100

    it "should return ratelimit reset time in headers", ->
      github.repoEvents('nodejs/node').then (d) ->
        (+d.res.headers['x-ratelimit-reset'] * 1000).should.above 1451606400000 # 2016-01-01

  describe "emojis", ->
    it "should return emoji list", (done) ->
      github.emojis().then (d) ->
        d.body['+1'].should.be.ok
        done()
      .catch done
