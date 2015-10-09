var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(session({ secret: 'h01yMaKar0ny' }));
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);

var isValid = function(req) {
    return req && req.body && req.body.email && req.body.password;
};

var users = {};

var isLoggedIn = function(req) {
    return req && req.session && req.session.email;
};

var isRegistered = function(req) {
    if(isValid(req)) {
        return users[req.body.email] === req.body.password;
    } else {
        return false;
    }
};

// Routing //

app.get('/', function(req, res) {
    if(isLoggedIn(req)) {
        res.redirect('/private');
    } else {
        res.render('index.html');
    }
});

app.get('/signup', function(req, res) {
    if(isLoggedIn(req)) {
        res.render('private.html');
    } else {
        res.render('signup.html');
    }
});

app.post('/signup', function(req, res) {
    if(isValid(req) && !isRegistered(req)) {
        users[req.body.email] = req.body.password;
        req.session.email = req.body.email;
        res.redirect('/login');
    } else { 
        res.redirect('/');
    }
});

app.get('/login', function(req, res) {
    if(isLoggedIn(req)) {
        res.render('private.html');
    } else {
        res.render('login.html');
    }
});

app.post('/login', function(req, res) {
    if(isRegistered(req)) {
        req.session.email = req.body.email;
        res.redirect('/private');
    } else {
        res.redirect('/');
    }
});

app.get('/private', function (req, res) {
    if(isLoggedIn(req)) {
        res.render('private.html');
    } else {
        res.redirect('/');
    }
});

app.get('/public', function (req, res) {
    res.render('public.html');
});

app.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log("session.destroy error: " + err);
        } else {
            res.redirect('/');
        }
    });
});

// Routing ends //

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Service started at http://%s:%s', host, port);
});

module.exports = server;