import "../styles/CreatePost.css";

import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

import AuthService from "../utils/auth";

export default function CreatePost() {
  const redirectToLogin = () => {
    // Redirect to the login page
    window.location.href = "/login";
  };

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    if (AuthService.loggedIn()) {
      setUsername(AuthService.getUser().data.username);
    } else {
      redirectToLogin();
      alert("Login or create an account to post");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  console.log(username);
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const redirectToFeed = () => {
    // Consider using React Router for navigation
    window.location.href = "/feed";
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating Post with:", username, postTitle, postBody);
      const { data } = await createPost({
        variables: { username, postTitle, postBody },
      });

      const post = data?.createPost?.post;
      redirectToFeed();
      console.log("Post created successfully");
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error:", error.message || "An error occurred");
    }
  };

  return (
    <div className="createPostPage">
      <h1 className="contact-title">Create a Post</h1>
      <div className="logInForm">
        <label htmlFor="email">Title: </label>
        <input
          className="custom-input"
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="email">Content: </label>

        <input
          className="custom-input"
          type="text"
          placeholder="Content"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button className="button" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
    </div>
  );
}
