const favicon = require('express-favicon');
const BodyParser = require('raw-body');
const express = require('express');
const util = require('util');
const fs = require('fs');
var app = express();
const port = 69;
//var AccountController = require('./Public/controllers/account.js')
//var userModel = require('./Public/models/user.js')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup', (req, res) => { 
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/about', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/computer', (req, res) => {
   // app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/comp.html');
});

app.post('/user/signup', function (req, res) {
    //res.send('POST request to the homepage ' + util.inspect(req.body) + ' hi')
    //AccountController = new AccountController(userModel);
    var password = req.body.password;
    var passconf = req.body.passconf;
    if (password.localeCompare(passconf)==0) {
        var newUser = JSON.stringify({username: req.body.username, email: req.body.email, password: req.body.password, passconf: req.body.passconf}, null, 2);
        var dataOBJ = {}
        var data = fs.readFileSync('./Database/users.json', 'utf8');
        if (!data) {
            dataOBJ.users=[];
        }
        else {
           dataOBJ = JSON.parse(data);
        }
        dataOBJ.users.push(newUser)
        fs.writeFileSync('./Database/users.json', JSON.stringify(dataOBJ), (err) => {});
        res.sendFile(__dirname + '/public/signup.html');
    }
    else {
        res.sendFile(__dirname + '/public/errors.html');
    };
  });

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)