const express = require('express')
const router = express.Router()
const User = require('./../models/Users')
const passport = require('passport')
const userController = require('./../controllers/user')

router.post('/register', (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        usertype: 'user'
    })

    userController.addUser(newUser, (err, result) => {
        if(err) {
            res.json({success: false, message: 'Failed to register new user'})
        } else {
            res.json({success: true, message: 'Successfuly registered'})
        }
        console.log(result)
    })
})

router.post('/authenticate', (req, res) => {
    const userCredentials = {
        username: req.body.username,
        password: req.body.password
    }
    const query = { username: userCredentials.username }

    userController.authenticate(query, userCredentials, (err, result, token) => {
        if(result) {
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
            res.send({success: false, message: 'Username or password inccorect'})
        }
    })
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.send(req.user);
    }
);

router.post('/email', (req, res) => {
        const query = { email: req.body.email }

        userController.checkEmail(query, (err, result) => {
            res.send(result)
        })
    }
);

router.post('/username', (req, res, next) => {
        const query = { username: req.body.username }

        userController.checkUsername(query, (err, result) => {
            res.send(result)
        })
    }
);

router.post('/getUser', (req, res, next) => {
    const token = { token: req.body.token }

    userController.getDecodeUser(token, (err, result) => {
        console.log(result)
        res.send(result)
    })
}
);


module.exports = router