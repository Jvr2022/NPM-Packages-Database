
var paginate = require('../index');
var util = require('util');
var url = require('url');
var reqres = require('reqres');
var async = require('async');

describe('paginate', function() {

  describe('.href(req)', function() {

    beforeEach(function() {
      this.req = {
        originalUrl: 'http://niftylettuce.com/',
        query: {
          page: 3
        }
      };
    });

    it('should return function', function() {
      paginate.href(this.req).should.be.a('function');
    });

    describe('the returned function', function() {

      it('should return the next page when invoked with no arguments', function() {
        paginate.href(this.req)().should.equal(util.format('%s?page=%d', url.parse(this.req.originalUrl).pathname, this.req.query.page + 1));
      });

      it('should return the next page when invoked with `false` as the first argument', function() {
        paginate.href(this.req)().should.equal(util.format('%s?page=%d', url.parse(this.req.originalUrl).pathname, this.req.query.page + 1));
      });

      it('should return the previous page href when invoked with `true` as the first argument', function() {
        paginate.href(this.req)(true).should.equal(util.format('%s?page=%d', url.parse(this.req.originalUrl).pathname, this.req.query.page - 1));
      });

      it('should return the previous page href and sorted by title when invoked with `true` and a `params` object', function() {
        paginate.href(this.req)(true, { sort: 'title' }).should.equal(util.format('%s?page=%d&sort=title', url.parse(this.req.originalUrl).pathname, this.req.query.page - 1));
      });

      it('should return the next page href and sorted by title when invoked with `false` and a `params` object', function() {
        paginate.href(this.req)(false, { sort: 'title' }).should.equal(util.format('%s?page=%d&sort=title', url.parse(this.req.originalUrl).pathname, this.req.query.page + 1));
      });

      it('should return the current page sorted by title when invoked with just a `params` object as the first argument', function() {
        paginate.href(this.req)({ sort: 'title' }).should.equal(util.format('%s?page=%d&sort=title', url.parse(this.req.originalUrl).pathname, this.req.query.page));
      });

    });

  });

  describe('.hasNextPages(req)', function() {

    beforeEach(function() {
      this.req = {
        query: {
          page: 3
        }
      };
    });

    it('should return function', function() {
      paginate.hasNextPages(this.req).should.be.a('function');
    });

    describe('the returned function', function() {

      it('should return true when there are more pages', function() {
        paginate.hasNextPages(this.req)(4).should.be.true;
      });

      it('should return false when there are no more pages', function() {
        paginate.hasNextPages(this.req)(3).should.be.false;
      });

      it('should throw an error when pageCount is not a number', function(){
        (function(){
          paginate.hasNextPages(this.req)('');
        }).should.throw(/not a number/);
      });

      it('should throw an error when pageCount is less than zero', function() {
        (function(){
          paginate.hasNextPages(this.req)('');
        }).should.throw(/\>= 0/);
      });

    });

  });

  describe('.middleware(limit, maxLimit)', function() {

      describe('should be a pure function with successive calls not mutating', function() {

          var firstMiddleware, secondMiddleware;

          beforeEach(function() {
              firstMiddleware = paginate.middleware(10, 20);
              secondMiddleware = paginate.middleware(30, 40);
          });

          it('limit in previous calls', function(done) {
              async.parallel(
                  [
                      function(callback) {
                          var req = reqres.req();
                          firstMiddleware(req, reqres.res(), function(err) {
                              req.query.limit.should.equal(10);
                              callback(null, null);
                          })
                      },
                      function(callback) {
                          var req = reqres.req();
                          secondMiddleware(req, reqres.res(), function(err) {
                              req.query.limit.should.equal(30);
                              callback(null, null);
                          })
                      }
                  ],
                  done
              );
          });

          it('maxLimit in previous calls', function(done) {
              async.parallel(
                  [
                      function(callback) {
                          var req = reqres.req({query: {limit: '100'}});
                          firstMiddleware(req, reqres.res(), function(err) {
                              req.query.limit.should.equal(20);
                              callback(null, null);
                          })
                      },
                      function(callback) {
                          var req = reqres.req({query: {limit: '100'}});
                          secondMiddleware(req, reqres.res(), function(err) {
                              req.query.limit.should.equal(40);
                              callback(null, null);
                          })
                      }
                  ],
                  done
              );
          });

      });

  });

});
