const express = require('express')
const jwt = require('jsonwebtoken')
const parser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

const app = express()
app.use(cors())
app.use(parser.json())

app.use('/user', require('./routers/users'))

mongoose.connect(config.database ,
 {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Database Connected!')
);

const port = 3001
app.listen(port, () => {
    console.log(`Running on port ${port} `)
})