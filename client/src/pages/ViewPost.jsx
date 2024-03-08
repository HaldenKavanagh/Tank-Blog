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

  const { postId } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [authUsername, setAuthUsername] = useState("");

  const { loading, data, error } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const username = AuthService.getUser().data?.username;
      if (username) {
        setAuthUsername(username);
      } else {
        redirectToLogin();
        alert("Login or create an account to interact with posts");
      }
    } else {
      redirectToLogin();
      alert("Login or create an account to interact with posts");
    }
  }, []);

  const post = data?.getPost;
  console.log(post);

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

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({
        variables: {
          postId,
          commentId,
        },
      });

      window.location.reload();
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
          Created by {post.username} on {post.createdAt}
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
                <p className="commentAuthor">{comment.username}:</p>
                <p className="commentBody">{comment.commentBody}</p>
                {authUsername === comment.username && (
                  <FaTrash
                    className="profileIcons"
                    onClick={() => handleDeleteComment(comment.commentId)}
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
