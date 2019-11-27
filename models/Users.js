const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

module.exports.authenticate = function(user, callback) {
    const query = { username: user.username }
    User.findOne(query, function(err, result) {
        if(result) {
            bcrypt.compare(user.password, result.password, function(err1, res) {
                if(res) {
                    const token = jwt.sign(result.toJSON(), database.jwt_secret, {
                        expiresIn: 604800
                    })
    
                    callback({
                        success: true,
                        message: 'Successfuly logged in',
                        token: 'Bearer '+token,
                        user: {
                            id: result._id,
                            firstname: result.firstname,
                            lastname: result.lastname,
                            email: result.email,
                            username: result.username,
                            usertype: result.usertype
                        }
                    })
                } else {
                    callback({success: false, message: 'Username or password inccorect'})
                }
            });
        }
        callback({success: false, message: 'Username or password inccorect'})
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