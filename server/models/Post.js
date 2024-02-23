const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    commentBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const postSchema = new Schema(
  {
    postBody: {
      type: String,

      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [
      {
        type: String,
        required: true,
      },
    ],
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// getter function to format the date time

postSchema.path("createdAt").get(function (value) {
  return value.toLocaleString();
});

const Post = model("post", postSchema);

module.exports = Post;
