// const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Post } = require("../models");

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      // Retrieve a user by ID
      return await User.findById(userId);
    },
    getAllUsers: async () => {
      // Retrieve all users
      return await User.find();
    },
    getPost: async (_, { postId }) => {
      // Retrieve a post by ID
      return await Post.findById(postId);
    },
    getAllPosts: async () => {
      // Retrieve all posts
      return await Post.find();
    },
  },

  Mutation: {
    createPost: async (_, { postBody, username }) => {
      // Create a new post
      const newPost = new Post({
        postBody,
        username: [username],
      });

      // Save the post to the database
      await newPost.save();

      return newPost;
    },
    deletePost: async (_, { postId }) => {
      // Delete a post by ID
      return await Post.findByIdAndDelete(postId);
    },
    addComment: async (_, { postId, commentBody, username }) => {
      // Add a comment to a post
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      post.comments.push({
        commentBody,
        username,
      });

      // Save the post with the new comment
      await post.save();

      return post;
    },
    deleteUser: async (_, { userId }) => {
      // Delete a user by ID
      return await User.findByIdAndDelete(userId);
    },
  },
};

module.exports = resolvers;
