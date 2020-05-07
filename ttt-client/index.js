var TicTacToe = require('tictactoe-agent');
//var model = new TicTacToe.Model('---------', 'X');
//var recommendation = model.getRecommendation();
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    var model = new TicTacToe.Model(req.query.game, 'O');
    var recommendation = model.getRecommendation();
    console.log(String(recommendation.index));
    res.send(String("Index: " + recommendation.index))

});

app.listen(69);

// Will Print out the recommended move