import "../styles/ViewPost.css";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_POST } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, DELETE_COMMENT } from "../utils/mutations";
import { FaTrash } from "react-icons/fa";

import AuthService from "../utils/auth";

export default function ViewPost() {
  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const handleViewUser = (username) => {
    window.location.href = `/user/${username}`;
  };

  const handleViewCommentAuthor = (username) => {
    window.location.href = `/user/${username}`;
  };

  const { postId } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [isPostCreator, setIsPostCreator] = useState(false);

  const { loading, data, error } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const username = AuthService.getUser().data?.username;
      if (username) {
        setAuthUsername(username);

        setIsPostCreator(username === data?.getPost?.username);
      } else {
        redirectToLogin();
        alert("Login or create an account to interact with posts");
      }
    } else {
      redirectToLogin();
      alert("Login or create an account to interact with posts");
    }
  }, [data?.getPost, isPostCreator]);

  const post = data?.getPost;

  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const username = AuthService.getUser().data?.username;
    if (!commentBody.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }
    try {
      const { data } = await addComment({
        variables: {
          postId,
          commentBody,
          username,
        },
      });

      setCommentBody("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const [deleteComment] = useMutation(DELETE_COMMENT);

  const handleDeleteComment = async (commentId, commentUsername) => {
    try {
      // Check if the logged-in user is the creator of the post
      const isPostCreator = authUsername === post.username;

      // Check if the logged-in user is the creator of the comment
      const isCommentCreator = authUsername === commentUsername;

      if (isPostCreator || isCommentCreator) {
        await deleteComment({
          variables: {
            postId,
            commentId,
          },
        });

        window.location.reload();
      } else {
        alert("You do not have permission to delete this comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading post</div>;
  }

  return (
    <div className="viewPost">
      <div className="postContainer">
        <p className="postInfo">
          Created by{" "}
          <a
            className="usernameAnchor"
            onClick={() => handleViewUser(post.username)}
          >
            {post.username}
          </a>{" "}
          on {post.createdAt}
        </p>
        <h2>{post.postTitle}</h2>
        <p>{post.postBody}</p>

        <h3>Comments</h3>

        <div className="addCommentContainer">
          <input
            className="custom-input"
            type="text"
            placeholder="Add a comment here"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
          <button className="commentButton" onClick={handleAddComment}>
            Add comment
          </button>
        </div>

        <div className="commentContainer">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div className="comment" key={comment.commentId}>
                <div className="commentData">
                  <a
                    className="commentAuthor"
                    onClick={() => handleViewCommentAuthor(comment.username)}
                  >
                    {comment.username}:
                  </a>

                  <p className="commentBody">{comment.commentBody}</p>
                </div>
                {(isPostCreator || authUsername === comment.username) && (
                  <FaTrash
                    className="profileIcons"
                    onClick={() =>
                      handleDeleteComment(comment.commentId, comment.username)
                    }
                  />
                )}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
