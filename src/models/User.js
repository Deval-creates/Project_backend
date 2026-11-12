const mongoose = require('mongoose');
// schema is the structure of our data in DB
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// model is an object based on some schema
module.exports = mongoose.model('User', userSchema);