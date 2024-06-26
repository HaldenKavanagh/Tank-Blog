const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    following: [User]!
    password: String
    bio: String!
    posts: [Post]!
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
    imagePath: String!
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
    getUser(username: String!): User
    getAllUsers: [User]
    getPost(postId: ID!): Post
    getAllPosts: [Post]
  }



  type Mutation {

    login(email: String!, password: String!): Auth
    logout: Message

    createPost(postBody: String!, postTitle: String!, imagePath: String!, username: String!): Post
    updatePost(postId: ID!, postBody: String!, postTitle: String!): Post
    deletePost(postId: ID!): Post

    addComment(postId: ID!, commentBody: String!, username: String!): Post
    updateComment(postId: ID!, commentId: ID!, commentBody: String!): Post
    deleteComment(postId: ID!, commentId: ID!): Post

    deleteUser(userId: ID!): User
    createUser(username: String!, email: String!, password: String!, bio: String!): Auth
    updateUser(userId: ID!, username: String!, bio: String!): User

    addFriend(userId: ID!, friendId: ID!): User
    removeFriend(userId: ID!, friendId: ID!): User
  }

  type Message {
    message: String
  }
`;

module.exports = typeDefs;
