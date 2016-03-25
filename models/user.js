var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username: String,
    passwordHash: String,
});


userSchema.methods.SaveHash = function(password) {
    this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.IsPasswordCorrect = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};


module.exports = mongoose.model('User', userSchema);
