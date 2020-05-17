const favicon = require('express-favicon');
const BodyParser = require('raw-body');
const express = require('express');
const util = require('util');
const fs = require('fs');
var app = express();
const port = 69;

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(express.static(__dirname + '/public/index.html'));
});

app.get('/signup', (req, res) => { 
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(express.static(__dirname + '/public/signup.html'));
});

app.get('/login', (req, res) => {
    app.use(express.static(__dirname + '/public/login.html'));
})

app.get('/about', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(express.static(__dirname + '/public/about.html'));
});

app.get('/computer', (req, res) => {
   // app.use(favicon(__dirname + '/public/favicon.ico'));
   app.use(express.static(__dirname + '/public/computer.html'));
});


app.listen(port)