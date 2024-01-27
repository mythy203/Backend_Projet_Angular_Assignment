let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = Schema({
    id:Number,
    username:String,
    password:String,
    role:String
})
const User = mongoose.model('User', UserSchema);
module.exports = { User };