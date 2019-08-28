const { model, Schema } = require('mongoose')

const postSchema = new Schema ({
    body: String,
    userName: String,
    createAt: String,
    comments: [
        {
            body: String,
            userName: String,
            createAt: String
        }
    ],
    likes: [
        {
            userName: String,
            createAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})


module.exports = model('Post', postSchema);