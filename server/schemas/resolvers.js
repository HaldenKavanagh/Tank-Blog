const { signToken, AuthenticationError } = require("../utils/auth");
const mongoose = require("mongoose");
const { Post, User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw AuthenticationError;
    },
    getUser: async (_, { userId }) => {
      // Retrieve a user by ID
      return await User.findById(userId);
    },
    getAllUsers: async () => {
      try {
        // Populate the 'posts' field for each user
        const users = await User.find().populate("posts");
        return users;
      } catch (error) {
        console.error(error);
        throw error;
      }
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
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("Incorrect email or password");
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
          throw new AuthenticationError("Incorrect email or password");
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    logout: async (parent, args, context) => {
      try {
        if (context.user) {
          return { message: "Logged out successfully" };
        }
        throw new AuthenticationError("Not logged in");
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createPost: async (_, { postBody, postTitle, username }) => {
      // Create a new post
      try {
        // Create a new post
        const newPost = new Post({
          postBody,
          postTitle,
          username,
        });

        // Save the post to the database
        await newPost.save();

        // Find the user who created the post
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error("User not found");
        }

        // Add the new post's _id to the user's posts array
        user.posts.push(newPost._id);

        // Save the updated user with the new post
        await user.save();

        return newPost;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createUser: async (parent, { username, email, password }) => {
      try {
        if (!username || !email || !password) {
          throw new Error("All fields are required.");
        }
        if (password.length < 5) {
          throw new Error("Password must be at least 5 characters long.");
        }

        const user = await User.create({ username, email, password });

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deletePost: async (_, { postId }) => {
      // Delete a post by ID
      return await Post.findByIdAndDelete(postId);
    },
    addComment: async (_, { postId, commentBody, username }, context) => {
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
    updatePost: async (_, { postId, postBody, postTitle }) => {
      return await Post.findByIdAndUpdate(
        postId,
        { postBody, postTitle },
        { new: true }
      );
    },
    updateUser: async (_, { userId, username }) => {
      return await User.findByIdAndUpdate(userId, { username }, { new: true });
    },
    updateComment: async (_, { postId, commentId, commentBody }) => {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        throw new Error("Comment not found");
      }

      comment.commentBody = commentBody;

      await post.save();

      return post;
    },
    removeFriend: async (_, { userId, friendId }) => {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const friendIndex = user.following.indexOf(friendId);

      if (friendIndex !== -1) {
        user.following.splice(friendIndex, 1);

        await user.save();
      }

      return user;
    },
  },
};

module.exports = resolvers;
