// require mongoose 
const mongoose = require('mongoose')

// faire le schema 

const userSchema = new mongoose.Schema({
    username: String,
    password: String
},
    { timestamps: true }
)

// faire le model

const User = mongoose.model('User', userSchema);
// faire l'export 

module.exports = User;