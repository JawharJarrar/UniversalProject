import app from '../server';
const  db = require('../database');
const mongoose = require('mongoose');
const { CommentSchema } = require('../models/comment') ;
const  chai = require ('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
require('mocha');
const  should =  chai.should();
const Comment = mongoose.model('Comment', CommentSchema);


/**
 * comment apis  unit tests
 */
describe('Comments', function() {
  beforeEach(function(done) {
    db.query('DELETE  FROM coments');
    Comment.remove({}, (err) => {
      done();
   });
  });
  afterEach(function(done) {
    db.query('DELETE  FROM comments');
    Comment.remove({}, (err) => {
      done();
    });
  });
  it('should delete a SINGLE comment on /comments/<id> DELETE', function(done) {
    Comment.create({ name: 'comment',
      email: 'comment@gmail.com',
      body: 'comment@gmail.com',
      id: '66' });
    db.query('INSERT INTO comments values (?,?,?,?,?)', [
      '66',
      '47',
      'comment',
      'comment@gmail.com',
      'comment@gmail.com',
    ]);
    chai.request(app)
    .del('/comments/' + 66)
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.have.property('REMOVED');
      done();
    });
  });

  it('should add a SINGLE comment on /comments to a post', function(done) {
    chai.request(app)
    .post('/comments')
    .send({ 'name': 'comment',
    'email': 'comment@gmail.com',
    'body': 'comment@gmail.com',
    'postId': '14' })
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('SUCCESS');
      response.body.SUCCESS.should.be.a('object');
      done();
    });
  });

  it('should update a SINGLE comments on /comments/<id> PUT', function(done) {
    Comment.create({ name: 'comment',
     email: 'comment@gmail.com',
      body: 'comment@gmail.com',
      id: '66',
      postId: '14' });
    db.query('INSERT INTO comments values (?,?,?,?,?)', [
      '66',
      '14',
      'comment',
      'comment@gmail.com',
      'comment@gmail.com',
    ]);
    chai.request(app)
    .put('/posts/' + 66)
    .send({ 'name': 'comment',
    'email': 'comment@gmail.com',
    'body': 'comment@gmail.com',
    'postId': '14' })
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('UPDATED');
      response.body.UPDATED.should.be.a('object');
      done();
    });
  });
  it('should list all comments of a post', function(done) {
    Comment.create({ name: 'comment',
     email: 'comment@gmail.com',
      body: 'comment@gmail.com',
      id: '66',
      postId: '14'});
    db.query('INSERT INTO comments values (?,?,?,?,?)', [
      '66',
      '14',
      'comment',
      'comment@gmail.com',
      'comment@gmail.com',
    ]);
    chai.request(app)
    .get('/posts/' + 14 + '/comments')
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.have.json;
      response.body.should.be.a('array');
      response.body.length.should.be.eql(1);
      done();
    });
  });
});
