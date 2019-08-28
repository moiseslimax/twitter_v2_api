const { model, Schema } = require('mongoose')

const postSchema = new Schema ({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            userName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userName: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})


module.exports = model('Post', postSchema);