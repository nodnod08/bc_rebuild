const User = require('./../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const database = require('./../config/database')

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) {
                callback(err, null)
            }
            newUser.password = hash
            newUser.save(null, callback)
        });
    });
}

module.exports.authenticate = function(query, userCredentials, callback) {
    User.findOne(query, function(err, result) {
        if(result) {
            bcrypt.compare(userCredentials.password, result.password, function(err1, res1) {
                if(res1) {
                    const token = jwt.sign(result.toJSON(), database.jwt_secret, {
                        expiresIn: 604800
                    })
                    // res.send({
                    //     success: true,
                    //     message: 'Successfuly logged in',
                    //     token: 'Bearer '+token,
                    //     user: {
                    //         id: result._id,
                    //         firstname: result.firstname,
                    //         lastname: result.lastname,
                    //         email: result.email,
                    //         username: result.username,
                    //         usertype: result.usertype
                    //     }
                    // })
                    callback(null, result, token)
                } else {
                    // res.send({success: false, message: 'Username or password inccorect'})
                    callback(null, null, null)
                }
            });
        } else {
            // res.send({success: false, message: 'Username or password incorrect'})
            callback(null, null, null)
        }
    })
}

module.exports.checkEmail = function(query, callback) {
    User.findOne(query, function(err, result) {
        const queryResult = {
            result: result
        }
        callback(null, queryResult)
    })
}

module.exports.checkUsername = function(query, callback) {
    User.findOne(query, function(err, result) {
        const queryResult = {
            result: result
        }
        callback(null, queryResult)
    })
}