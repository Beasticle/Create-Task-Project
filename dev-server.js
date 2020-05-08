const express = require('express')
const bodyParser = require('body-parser')
var app = express()
var favicon = require('express-favicon');
const port = 69
app.use(express.static('public'))

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)