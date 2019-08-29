const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    emailaddress: String,
    username: String          
});

const User = mongoose.model('user', userSchema);

module.exports = User;
