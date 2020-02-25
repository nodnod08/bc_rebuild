const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users' 
    },
    filename: {
        type: String
    },
    post:{ 
        type: Schema.Types.ObjectId,
        ref: 'Posts' 
    },
    date:{ 
        type: Date,
        default: Date.now
    }
})

const File = module.exports = mongoose.model('Files', FileSchema)
