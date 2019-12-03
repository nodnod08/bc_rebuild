const User = require('./../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const database = require('./../config/database')
const _ = require('lodash')

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
    User.findOne(query, async function(err, result) {
        if(result) {
            bcrypt.compare(userCredentials.password, result.password, function(err1, res1) {
                if(res1) {
                    const result_final = result.toJSON()
                    delete result_final.password

                    const token = jwt.sign(result_final, database.jwt_secret, {
                        expiresIn: 604800
                    })
                    callback(null, result, token)
                } else {
                    callback(null, null, null)
                }
            });
        } else {
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

module.exports.getDecodeUser = async function(token, callback) {
    var decoded = await jwt.decode(token.token.substring(7), database.jwt_secret);

    User.findOne({_id: decoded._id}, function(err, result) {
        const result_final = result.toJSON()
        delete result_final.password
        
        const queryResult = {
            result: result_final
        }
        callback(null, queryResult)
    })
}