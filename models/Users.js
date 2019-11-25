const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const database = require('./../config/database')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    usertype: {
        type: String
    }
})

const User = module.exports = mongoose.model('Users', UserSchema)

module.exports.getUserById = function(id, callback) {
    User.findById(Id, callback)
}

module.exports.getUserByUsername = function(user, callback) {
    const query = { username: user.username }
    User.findOne(query, function(err, result) {
        bcrypt.compare(user.password, result.password, function(err1, res) {
            if(res) {
                callback({success: true, message: 'Successfuly logged in'})
            } else {
                callback({success: false, message: 'Username or password inccorect'})
            }
        });

    })
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err
            newUser.password = hash
            newUser.save(callback)
        });
    });
}