const express = require('express')
var util = require('util')
var app = express()
var favicon = require('express-favicon');
const port = 69
var AccountController = require('./Public/controllers/account.js')
var userModel = require('./Public/models/user.js')
app.use(express.urlencoded({ extended: false }));

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
    const newUser = { username: req.body.username, email: req.body.email, password: req.body.password}
    //AccountController = new AccountController(userModel);
    AccountController.prototype.register(newUser, function(err, user) {
        res.send(user);
      });
  })

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)