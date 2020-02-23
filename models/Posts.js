const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users' 
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    date:{ 
        type: Date,
        default: Date.now
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
    ]
})

const Post = module.exports = mongoose.model('Posts', PostSchema)
