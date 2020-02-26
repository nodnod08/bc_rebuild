const Post = require('./../models/Posts')
const File = require('./../models/Files')
const User = require('./../models/Users')

module.exports.addPost = function(user, posting, files, callback) {
    User.findById(user.id).then(result => {
        if(result) {
            const filesContainer = []
            const post = new Post({
                user: user.id,
                title: posting.title,
                description: posting.description
            })
            for(i=0; i<files.length; i++) {
                const fileCreating = new File({
                    user: user.id,
                    filename: files[i],
                    post: post.id
                })
                post.files.push(fileCreating._id)
                filesContainer.push(fileCreating)
            }
            for(i=0; i<filesContainer.length; i++) {
                filesContainer[i].save()
            }
            post.save(null, callback)


        } else {
            callback("user not found", null)
        }
    })
}

module.exports.getAllPosts = async function(word, callback) {
    const post = await Post.find({}).populate('files').then((err, result) => {
        callback(err, result)
    })
}