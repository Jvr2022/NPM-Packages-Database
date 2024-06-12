/*jslint nodejs: true*/
/*global describe: true, it: true*/

'use strict';

var should = require('should'),
    express = require('express'),
    supertest = require('supertest'),
    cors = require('../lib');

/* -------------------------------------------------------------------------- */

var simpleApp = express();
simpleApp.get('/', cors(), function(req, res){
  res.send('Hello World (Get)');
});
simpleApp.head('/', cors(), function(req, res){
  res.send(204);
});
simpleApp.post('/', cors(), function(req, res){
  res.send('Hello World (Post)');
});

/* -------------------------------------------------------------------------- */

var complexApp = express();
complexApp.options('/', cors.preflight());
complexApp.del('/', cors(), function(req, res){
  res.send('Hello World (Delete)');
});

/* -------------------------------------------------------------------------- */

describe('example app(s)', function(){
  describe('simple methods', function(){
    it('GET works', function(done){
      supertest(simpleApp)
        .get('/')
        .expect(200)
        .end(function(err, res){
          should.not.exist(err);
          res.headers['access-control-allow-origin'].should.eql('*');
          res.text.should.eql('Hello World (Get)');
          done();
        });
    });
    it('HEAD works', function(done){
      supertest(simpleApp)
        .head('/')
        .expect(204)
        .end(function(err, res){
          should.not.exist(err);
          res.headers['access-control-allow-origin'].should.eql('*');
          done();
        });
    });
    it('POST works', function(done){
      supertest(simpleApp)
        .post('/')
        .expect(200)
        .end(function(err, res){
          should.not.exist(err);
          res.headers['access-control-allow-origin'].should.eql('*');
          res.text.should.eql('Hello World (Post)');
          done();
        });
    });
  });

  describe('complex methods', function(){
    it('OPTIONS works', function(done){
      supertest(complexApp)
        .options('/')
        .expect(204)
        .end(function(err, res){
          should.not.exist(err);
          res.headers['access-control-allow-origin'].should.eql('*');
          done();
        });
    });
    it('DELETE works', function(done){
      supertest(complexApp)
        .del('/')
        .expect(200)
        .end(function(err, res){
          should.not.exist(err);
          res.headers['access-control-allow-origin'].should.eql('*');
          res.text.should.eql('Hello World (Delete)');
          done();
        });
    });
  });
});
