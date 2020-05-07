var express = require('express')
var app = express()
var serveIndex = require('serve-index')
var pretty = require('pretty-time')
var favicon = require('express-favicon');
var start = process.hrtime()
var time = process.hrtime()
const port = 69

app.use(express.static('public'))

//app.get('/support', (req, res) => {
//    app.use(favicon(__dirname + '/public/favicon.ico'));
//    res.sendFile(__dirname + '/public/support.html');
//    res.sendFile(__dirname + '/public/css/mystyle.css');
//});

app.listen(port)