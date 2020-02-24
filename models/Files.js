const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users' 
    },
    filename: {
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

const File = module.exports = mongoose.model('Files', FileSchema)
