const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users' 
    },
    comment: {
        type: String
    },
    date:{ 
        type: Date,
        default: Date.now
    },
    post:{ 
            type: Schema.Types.ObjectId,
            ref: 'Posts' 
    }
})

const Comment = module.exports = mongoose.model('Comments', CommentSchema)
