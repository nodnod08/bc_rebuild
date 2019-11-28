const express = require('express')
const router = express.Router()
const User = require('./../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const database = require('./../config/database')

router.post('/register', (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
    })

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, message: 'Failed to register new user'})
        } else {
            res.json(user)
        }
    })
})

router.post('/authenticate', (req, res) => {
    const userCredentials = {
        username: req.body.username,
        password: req.body.password
    }
    const query = { username: userCredentials.username }

    User.findOne(query, function(err, result) {
        if(result) {
            bcrypt.compare(userCredentials.password, result.password, function(err1, res1) {
                if(res1) {
                    const token = jwt.sign(result.toJSON(), database.jwt_secret, {
                        expiresIn: 604800
                    })
                    res.send({
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
                    res.send({success: false, message: 'Username or password inccorect inner'})
                }
            });
        } else {
            res.send({success: false, message: 'Username or password incorrect outer'})
        }
    })
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.send(req.user);
    }
);

router.post('/email', (req, res, next) => {
        const query = { email: req.body.email }
        User.findOne(query, function(err, result) {
            res.send({
                result: result
            })
        })
    }
);


module.exports = router