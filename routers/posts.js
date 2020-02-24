const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../models/Users')
const passport = require('passport')
const userController = require('./../controllers/user')
const database = require('./../config/database')
const axios = require('axios')
const CircularJSON = require('circular-json');
const multer = require('multer');
const path = require('path');

'use strict'

router.post('/insert',  (req, res) => {
    const storage = multer.diskStorage({
        destination: "./storage/",
        filename: function(req, file, cb){
           filename = "IMAGE-" + Date.now() + file.originalname.split(' ').join('-').split('.')[0] + path.extname(file.originalname)
           console.log(filename)
           cb(null,"IMAGE-" + filename);
        }
    });
     
     const upload = multer({
        storage: storage,
     }).any("files");

     upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        if(!err)
           return res.send(200).end();
     });
})


module.exports = router