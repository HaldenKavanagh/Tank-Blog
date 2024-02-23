// const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Post } = require("../models");
const bcrypt = require("bcrypt");

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
    createUser: async (_, { username, email, password }) => {
      // Create a new user
      const newUser = new User({
        username,
        email,
        password,
      });

      // Hash the password before saving it to the database
      const saltRounds = 10;
      newUser.password = await bcrypt.hash(newUser.password, saltRounds);

      // Save the user to the database
      await newUser.save();

      return newUser;
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
    addFriend: async (_, { userId, friendId }) => {
      // Add a friend to a user
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        throw new Error("User or friend not found");
      }

      // Check if the friend is already in the user's friends list
      if (!user.following.includes(friendId)) {
        user.following.push(friendId);
      }

      // Save the updated user with the new friend
      await user.save();

      return user;
    },
    deleteUser: async (_, { userId }) => {
      // Delete a user by ID
      return await User.findByIdAndDelete(userId);
    },
  },
};

module.exports = resolvers;
