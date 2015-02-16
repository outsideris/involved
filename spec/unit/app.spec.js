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
        repo.db.allDocs(function(err, docs) {
          docs.rows.forEach(function(r) {
            repo.db.remove(r.id)
          });
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
});
