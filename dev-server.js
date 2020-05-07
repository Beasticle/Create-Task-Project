const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
var app = express()
var favicon = require('express-favicon');
const port = 69
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/userData",{config})
const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const { password } = require('./public/js/index.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

var User = mongoose.model("User", userSchema);

app.use(express.static('public'))

app.post("/addUser", (req, res) => {
    var data = new User(req.body);
    data.save()
    .then(item => {
        res.send("item saved to database");
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)