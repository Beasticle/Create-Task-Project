const favicon = require('express-favicon');
const BodyParser = require('raw-body');
const express = require('express');
const util = require('util');
const fs = require('fs');
var app = express();
const port = 69;
//var AccountController = require('./Public/controllers/account.js')
//var userModel = require('./Public/models/user.js')
app.use(BodyParser.json)

app.get('/', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    //res.sendFile(__dirname + '/public/css/mystyle.css');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup', (req, res) => { 
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    //res.sendFile(__dirname + '/public/css/mystyle.css');
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/about', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/about.html');
    //res.sendFile(__dirname + '/public/css/mystyle.css');
});

app.get('/computer', (req, res) => {
   // app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/comp.html');
    //res.sendFile(__dirname + '/public/css/mystyle.css');
});

app.post('/user/signup', function (req, res) {
    //res.send('POST request to the homepage ' + util.inspect(req.body) + ' hi')
    //AccountController = new AccountController(userModel);
    fs.writeFileSync('./Database/users.json', {username:req.body.username});
  })

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)