
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    posts: [Post]!
    following: [User]!
  }

  type Comment {
    commentId: ID!
    commentBody: String!
    username: String!
    createdAt: String!
  }

  type Post {
    _id: ID!
    postBody: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
  }

  type Query {
    getUser(userId: ID!): User
    getAllUsers: [User]
    getPost(postId: ID!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    createPost(postBody: String!, username: String!): Post
    deletePost(postId: ID!): Post
    addComment(postId: ID!, commentBody: String!, username: String!): Post
    deleteUser(userId: ID!): User
  }
`;

module.exports = typeDefs;