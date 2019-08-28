const gql = require("graphql-tag");

const typeDefs = gql`
  type Post{
      id: ID!
      body: String!
      createdAt: String!
      username: String!
  }
  
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Query { #Todas Querys
    getPosts: [Post!]!
    getPost(postId: ID!): Post
  }

  type Mutation { #Todas Mutations
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
`;

module.exports = typeDefs;
