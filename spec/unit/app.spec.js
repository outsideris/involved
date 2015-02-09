describe('Involved', function() {
  'use strict';

  var $rootScope, $compile;

  beforeEach(module('involved'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('repo service', function() {
    var repo;
    beforeEach(function(done) {
      inject(function(_repo_) {
        repo = _repo_;
        repo.unwatchAll(function() {
          done();
        });
      });
    });

    describe('watch', function() {
      it('should add repository', function(done) {
        // given
        var r = {owner: 'Automattic', repo: 'socket.io'};
        // when
        repo.watch(r, function(err, repos) {
          // then
          expect(repos.length).to.be.equal(1);
          done();
        });
      });
    });

    describe('unwatch', function() {
      it('should remove specific repository', function(done) {
        // given
        var r = {owner: 'Automattic', repo: 'socket.io'};
        var r2 = {owner: 'iojs', repo: 'io.js'};
        repo.watch(r, function() {
          repo.watch(r2, function() {
            // when
            repo.unwatch(r2, function(err, repos) {
              // then
              expect(repos.length).to.be.equal(1);
              expect(repos[0].owner).to.be.equal(r.owner);
              done();
            });
          });
        })
      });
    });
  });

  describe('db service', function() {
    var db;
    beforeEach(inject(function (_db_) {
      db = _db_;
    }));

    describe('registerProject', function() {
      it('should add a project', function(done) {
        // given
        var p = {owner: 'Automattic', repo: 'socket.io'};
        // when
        db.registerProject(p, function(err, doc) {
          // then
          expect(doc.ok).to.be.ok;
          expect(doc.id).to.be.exist;
          done();
        });
      });
    });

    describe('unregisterProject', function() {
      it('should remove a project', function(done) {
        // given
        var p = {owner: 'Automattic', repo: 'socket.io'};
        db.registerProject(p, function(err, doc) {
          p._id = doc.id;
          db.unregisterProject(p, function(err, doc) {
            expect(doc.ok).to.be.ok;
            expect(doc.id).to.be.equal(p._id);
            done();
          });
        });
      });
    });

    describe('unregisterAllProject', function() {
      it('should remove all projects', function(done) {
        // given
        var p = {owner: 'Automattic', repo: 'socket.io'};
        var p2= {owner: 'summernote', repo: 'summernote'};
        db.registerProject(p, function(err, doc) {
          db.registerProject(p2, function(err, doc) {
            db.unregisterAllProjects(function(err) {
              expect(err).to.be.not.ok;
              done();
            });
          });
        });
      });
    });
  });
});
