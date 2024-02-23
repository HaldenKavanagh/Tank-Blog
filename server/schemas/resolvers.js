const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Post } = require("../models");

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      // Retrieve a user by ID
      return await User.findById(userId);
    },
    getAllUsers: async () => {
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
      const newPost = new Post({
        postBody,
        postTitle,
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
