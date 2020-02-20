require('dotenv').config();
const express = require('express')
const jwt = require('jsonwebtoken')
const parser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

const app = express()
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(parser.json())

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use('/user', require('./routers/users'))

mongoose.connect(config.database ,
 {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Database Connected!')
);

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT} `)
})