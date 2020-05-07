const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/userData")

var password = null;

function guestAlert() {
    alert('You are playing as a guest')
}

function passCheck() {
    var p1 = document.getElementById('password');
    var p2 = document.getElementById('password-conf');
    if (p1.localCompare(p2) = 0) {
        var password = p1;
        alert('You now have an account')
    } else {
        alert('Passwords do not match');
    }
}
module.exports = { password };