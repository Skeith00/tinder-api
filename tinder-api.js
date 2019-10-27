var express = require('express');
var path = require('path');
var passport = require('passport');
var session = require("express-session");
var bodyParser = require("body-parser");
require('./src/js/fbauth')(passport);

var app = express();
app.use(express.static("public"));
app.use(session({ secret: "tinderalllikes" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const port = 80;

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
app.listen(port, () => console.log('\x1b[31m%s\x1b[0m', `Tinder App listening on port ${port}`))

// viewed at http://localhost:80
app.get('/login', function(req, res) {
    if(req.isAuthenticated()) {
        console.log(req.user.token);
        res.redirect('/tinder');
    }
    res.sendFile(path.join(__dirname + '/src/pages/login.html'));
});

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/tinder' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/tinder');
});

passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });

// viewed at http://localhost:80
app.get('/tinder', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/pages/tinder.html'));
});

