const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users' 
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments:[
        { 
            type: Schema.Types.ObjectId,
            ref: 'Comments' 
        }
    ],
    files:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Files' 
        }
    ],
    date:{ 
        type: Date,
        default: Date.now
    },
})

const Post = module.exports = mongoose.model('Posts', PostSchema)
