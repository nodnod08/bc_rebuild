const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

const app = exporess()

const port = 3000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})