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
    postTitle: String!
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
    createPost(postBody: String!, postTitle: String!, username: String!): Post
    updatePost(postId: ID!, postBody: String!, postTitle: String!): Post
    deletePost(postId: ID!): Post
    addComment(postId: ID!, commentBody: String!, username: String!): Post
    updateComment(postId: ID!, commentId: ID!, commentBody: String!): Post
    deleteUser(userId: ID!): User
    createUser(username: String!, email: String!, password: String!): User
    updateUser(userId: ID!, username: String!): User
    addFriend(userId: ID!, friendId: ID!): User
    removeFriend(userId: ID!, friendId: ID!): User
  }
`;

module.exports = typeDefs;
