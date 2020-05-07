var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { password } = require('./index.js')
    //Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/userDatabase';

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', function() {
    console.log('Connected')
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

var userModel = mongoose.model('userModel', userSchema);

function addUser() {
    var userInstance = new userModel({
        name: document.getElementById('username'),
        email: document.getElementById('email'),
        password: password
    });

    userInstance.save(function(err) {
        if (err) return handleError(err);
    });

    console.log(userInstance.name);
}

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });