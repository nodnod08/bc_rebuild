const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const database = require('./../config/database')

const UserSchema = new mongoose.Schema({
    processFrom: {
        type: String
    },
    googleId: {
        type: String
    },
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
    },
    img: {
        type: String
    },
    date:{ 
        type: Date,
        default: Date.now
    },
})

const User = module.exports = mongoose.model('Users', UserSchema)
