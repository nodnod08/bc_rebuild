const Post = require('./../models/Posts')
const File = require('./../models/Files')
const User = require('./../models/Users')

module.exports.addPost = function(user, posting, files, callback) {
    User.findById(user._id).then(result => {
        try {
            const filesContainer = []
            const post = new Post({
                user: result._id,
                title: posting.title,
                description: posting.description
            })
            for(i=0; i<files.length; i++) {
                const fileCreating = new File({
                    user: result._id,
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
        } catch (err) {
            callback(err, null)
        }
    })
}

module.exports.getAllPosts = async function(word, callback) {
    try {
        const post = await Post.find({}).populate('user', '-password').populate('files').then((result) => {
            callback(null, result)
        })
    } catch(err) {
        callback(err, null)
    }
}