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

app.get('/css/style.css', function(req, res) {
    res.sendFile(__dirname + '/' + 'public/css/stanard.css')
})

app.get('/', (req, res) => {
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup', (req, res) => { 
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

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
    var data = fs.readFileSync('./Database/users.json', 'utf8');
    var dataOBJ = JSON.parse(data);
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var passconf = req.body.passconf;

    if (password.localeCompare(passconf)==0) {
        for (var i = 0; i < dataOBJ.users.length; i++) {
            if (dataOBJ.users[i].username.localeCompare(username) == 0 || dataOBJ.users[i].email.localeCompare(email) == 0) {
                console.log(dataOBJ.users[i].username.localeCompare(username) == 0);
                res.send('Username or email already exisits');
                break
            }
            else {
                var jsonObj = {
                    "username": req.body.username,
                    "email": req.body.email,
                    "password": req.body.password,
                    "passconf": req.body.passconf
                };
            }
        }
        var newUser = jsonObj;
        if (!data) {
            dataOBJ.users=[];
        }
        else {
            dataOBJ = JSON.parse(data);
        }
        dataOBJ.users.push(newUser)
        fs.writeFileSync('./Database/users.json', JSON.stringify(dataOBJ), (err) => {});
        fs.readFile(__dirname + '/public/login.html', function(err, htmltext){
            if(err){
                res.send("ERROR")//.status(200).send(htmltext)
            }else{
                res.sendFile(__dirname + '/public/comp.html')
            }
        });
    }
    else {
        res.sendFile(__dirname + '/public/errors.html');
    };
});

  app.post('/user/login', function (req, res) {
      var data = fs.readFileSync('./Database/users.json', 'utf8');
      var userID = req.body.userID;
      var password = req.body.password;
      var dataOBJ = JSON.parse(data);
      for (var i = 0; i < dataOBJ.users.length; i++) {
        console.log((dataOBJ.users[i].username.localeCompare(userID) == 0 || dataOBJ.users[i].email.localeCompare(userID) == 0))
        if (dataOBJ.users[i].username.localeCompare(userID) == 0 || dataOBJ.users[i].email.localeCompare(userID) == 0) {
            if (dataOBJ.users[i].password.localeCompare(password) == 0) {
                console.log('suck a dick ' + String(i));
                res.status(200).sendFile(__dirname + "/public/comp.html");
                break
            }
            else {
                console.log('WRONG ' + String(i));
                res.sendFile(__dirname + "/public/login.html");
            }
         }else{
            console.log('WRONG ' + String(i));
            res.sendFile(__dirname + "/public/login.html");
         }
      }
  });

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)