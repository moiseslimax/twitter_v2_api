const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require('./config')

//GraphQl types and resolvers
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        return server.listen({ port: 5001 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
      });

