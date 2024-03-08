import "../styles/ViewPost.css";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_POST } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";

import AuthService from "../utils/auth";

export default function ViewPost() {
  const redirectToLogin = () => {
    // Redirect to the login page
    window.location.href = "/login";
  };

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    if (AuthService.loggedIn()) {
      const username = AuthService.getUser().data?.username; // Add the ? to handle potential null or undefined
      if (username) {
        console.log(username);
      } else {
        redirectToLogin();
        alert("Login or create an account to interact with posts");
      }
    } else {
      redirectToLogin();
      alert("Login or create an account to interact with posts");
    }
  }, []);

  // Get the postId from the URL using useParams
  const { postId } = useParams();
  const [commentBody, setCommentBody] = useState("");

  console.log(postId);

  const { loading, data, error } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading post</div>;
  }

  const post = data?.getPost;
  console.log(post);

  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!AuthService.loggedIn()) {
      redirectToLogin();
      return;
    }
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

      
      const newComment = data.addComment.comments[data.addComment.comments.length - 1];

      setCommentBody("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="viewPost">
      <div className="postContainer">
        <p>
          Created by {post.username} on {post.createdAt}
        </p>
        <h2>{post.postTitle}</h2>
        <p>{post.postBody}</p>

        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <div key={comment.commentId}>
            <p>{comment.commentBody}</p>
            <p>
              Comment by {comment.username} on {comment.createdAt}
            </p>
          </div>
        ))}
      </div>
      <input
        className="custom-input"
        type="text"
        placeholder="Add a comment here"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
      />
      <button className="button" onClick={handleAddComment}>
        add comment
      </button>
    </div>
  );
}
