const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');

const postController = require('./../controllers/post')

'use strict'

router.post('/insert',  (req, res) => {
  const files = []
  const storage = multer.diskStorage({
      destination: "./storage/",
      filename: function(req, file, cb){
        filename = file.originalname.split(' ').join('_').split('.').slice(0, -1).join('_') + '_' + Date.now() + path.extname(file.originalname)
        files.push(filename)
        cb(null, filename);
      }
  });
  
  const upload = multer({
      storage: storage,
  }).any("files");

  upload(req, res, (err) => {
    const user = JSON.parse(JSON.parse(req.body.user))
    const posting = {
      title: req.body.title,
      description: req.body.description
    }
    postController.addPost(user.user, posting, files, (err, result) => {
      if(err) {
        res.send({...err, success:false})
      } else {
        res.send({...result, success:true})
      }
    })
  });
})

router.get('/getAllPosts', (req, res) => {
  postController.getAllPosts(null, (err, result) => {
    (err) ? res.send({ result: err }) : res.send({ result: result })
  })
})


module.exports = router