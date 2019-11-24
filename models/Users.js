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

const User = mongoose.model('Users', UserSchema)

module.exports = User