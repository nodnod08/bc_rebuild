const express = require('express')
const router = express.Router()
const User = require('./../models/Users')

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

    User.getUserByUsername(userCredentials, (callback) => {
        res.json(callback)
    })
})



module.exports = router