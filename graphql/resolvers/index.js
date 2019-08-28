const postsResolvers = require('./posts');
const userResolvers = require('./user');
const commentsResolvers = require('./comments');

module.exports = {
    Post: {
        likeCount(parent){
            return parent.likes.length;
        },
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query //Post Resolvers
    },
    
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}