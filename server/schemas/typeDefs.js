const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]!
    following: [User]!
    password: String
  }

  type Image {
    filename: String!
    path: String!
  }
  
  input ImageInput {
    file: Upload!
  }
  
  extend type Post {
    images: [Image]
  }
  
  extend type Mutation {
    createPostWithImage(postBody: String!, postTitle: String!, username: String!, images: [ImageInput]): Post
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getUser(userId: ID!): User
    getAllUsers: [User]
    getPost(postId: ID!): Post
    getAllPosts: [Post]
  }

  scalar Upload

  type Mutation {

    uploadFile(file: Upload!): String
    
    login(email: String!, password: String!): Auth
    logout: Message

    createPost(postBody: String!, postTitle: String!, username: String!): Post
    updatePost(postId: ID!, postBody: String!, postTitle: String!): Post
    deletePost(postId: ID!): Post

    addComment(postId: ID!, commentBody: String!, username: String!): Post
    updateComment(postId: ID!, commentId: ID!, commentBody: String!): Post

    deleteUser(userId: ID!): User
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(userId: ID!, username: String!): User

    addFriend(userId: ID!, friendId: ID!): User
    removeFriend(userId: ID!, friendId: ID!): User
  }

  type Message {
    message: String
  }
`;

module.exports = typeDefs;
