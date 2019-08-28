const postsResolvers = require('./posts');
const userResolvers = require('./user');

module.exports = {
    Query: {
        ...postsResolvers.Query //Post Resolvers
    },
    
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}