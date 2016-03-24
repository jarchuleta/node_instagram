var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({
    username: String,
    password: String,
});


module.exports = mongoose.model('User', kittySchema);
