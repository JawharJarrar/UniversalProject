import app from '../server';
const mongoose = require('mongoose');
const { PostSchema } = require('../models/post');
require('mocha');
const  chai = require ('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const  should =  chai.should();
const  db = require('../database');
const Post = mongoose.model('Post', PostSchema);
/**
 *  posts api  unit tests
 */
describe('Posts', function() {
  beforeEach(function(done) {
    db.query('DELETE  FROM posts');
    Post.remove({}, (err) => {
      done();
    });
  });
  afterEach(function(done) {
    db.query('DELETE  FROM posts');
    Post.remove({}, (err) => {
      done();
    });
  });

  it('should list ALL posts on /posts GET', function(done) {
    Post.create({ title: 'jack', body: 'Script@gmail.com', id: ' 77' });
    db.query('INSERT INTO posts values (?,NULL,?,?)', [
      '77',
      'jack',
      'Script@gmail.com',
    ]);
    chai.request(app)
    .get('/posts')
    .end(function(err, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.be.eql(1);
      done();
    });
  });

  it('should delete a SINGLE post on /posts/<id> DELETE', function(done) {
    Post.create({ title: 'jack', body: 'Script@gmail.com', id: ' 77' });
    db.query('INSERT INTO posts values (?,NULL,?,?)', [
      '77',
      'jack',
      'Script@gmail.com',
    ]);
    chai.request(app)
    .del('/posts/' + 77)
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.have.property('REMOVED');
      done();
    });
  });

  it('should add a SINGLE post on /posts POST', function(done) {
    chai.request(app)
    .post('/posts')
    .send({ 'title': 'Java', 'body': 'Script@gmail.com' })
    .end(function(err, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('SUCCESS');
      response.body.SUCCESS.should.be.a('object');
      done();
    });
  });

  it('should update a SINGLE posts on /posts/<id> PUT', function(done) {
    Post.create({ title: 'jack', body: 'Script@gmail.com', id: ' 77' });
    db.query('INSERT INTO posts values (?,NULL,?,?)', [
      '77',
      'jack',
      'Script@gmail.com',
    ]);
    chai.request(app)
    .put('/posts/' + 77)
    .send({ 'title': 'Java', 'body': 'Script@gmail.com' })
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
});
