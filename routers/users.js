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

    newUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({
            message: err
        })
    })
})

router.get('/users', (req, res) => {
    const users = User.find()

    res.send(users)
})

module.exports = router