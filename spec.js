// mocha -R spec spec.js

var request = require('supertest');

describe('basic', function() {
    var server;
    beforeEach(function() {
        server = require('./app');
    });
    
    it('responds to /', function test(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    
    it('gets /login', function test(done) {
        request(server)
            .get('/login')
            .expect(200, done);
    });
    
    it('gets /signup', function test(done) {
        request(server)
            .get('/signup')
            .expect(200, done);
    });
    
    it('gets /public', function test(done) {
        request(server)
            .get('/public')
            .expect(200, done);
    });
    
    it('gets /private', function test(done) {
        request(server)
            .get('/private')
            .expect(302, done);
    });
    
    it('posts to /logout', function test(done) {
        request(server)
            .post('/logout')
            .expect(302, done);
    });
    
    it('gets other routes', function test(done) {
        request(server)
            .get('/asdf')
            .expect(404, done);
    });
});

describe('using auth', function() {
    var server;
    beforeEach(function() {
        server = require('./app');
    });
    
    it('signs up', function (done) {
        request(server)
            .post('/signup')
            .field('email', 'asdf@asdf.com')
            .field('password','l4k5$j#h@@')
            .expect('Location', '/')
            .expect(302, done);
    });
    
    it('logs in', function (done) {
        request(server)
            .post('/login')
            .field('email', 'asdf@asdf.com')
            .field('password','l4k5$j#h@@')
            .expect('Location', '/')
            .expect(302, done);
    });
    
    it('posts to /logout', function (done) {
        request(server)
            .post('/logout')
            .expect('Location', '/')
            .expect(302, done);
    });
});