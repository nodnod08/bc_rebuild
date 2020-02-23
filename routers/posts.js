const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../models/Users')
const passport = require('passport')
const userController = require('./../controllers/user')
const database = require('./../config/database')
const axios = require('axios')
const CircularJSON = require('circular-json');
'use strict'

router.post('/insert',  (req, res) => {
    
})


module.exports = router