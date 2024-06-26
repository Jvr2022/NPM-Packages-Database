var connect = require('connect');
var assert = require('assert');
var request = require('supertest');
var should = require('should');

var multer = require('..');

describe('multer', function(){

  it('should parse multipart/form-data text field', function(done){

    var app = connect()
        //.use(multer())


  // .use(multer({
  //   dest: './images/'
  // }))

  .use(multer({
    onParseEnd: function() {
      console.log('Form processed!');
    }
  }))

        // .use(function(req, res, next) {
        //   req.body = 'LOL';
        //   next();
        // })
        .use(function(req, res){
          res.end(req.body);
        });

    request(app)
    .post('/')
    .type('form')
    .send({name: 'lee'})
    .end(function(err, res){
      res.text.should.equal('{"name":"lee"}');
      done();
    });

  });


});