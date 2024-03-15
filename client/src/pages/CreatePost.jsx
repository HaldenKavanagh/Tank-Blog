import "../styles/CreatePost.css";

import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AuthService from "../utils/auth";

export default function CreatePost() {
  const redirectToFeed = () => {
    // Redirect to the login page
    window.location.href = "/feed";
  };

  const redirectToProfile = () => {
    // Redirect to the login page
    window.location.href = "/profile";
  };

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setUsername(AuthService.getUser().data.username);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(username);
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating Post with:", username, postTitle, postBody);
      const { data } = await createPost({
        variables: { username, postTitle, postBody },
      });

      const post = data?.createPost?.post;

      console.log("Post created successfully");
      handleShow();
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

        <textarea
          className="custom-input-large"
          type="text"
          placeholder="Content"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button className="button" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Post created Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="button" onClick={redirectToFeed}>
            View Feed
          </Button>
          <Button className="button" onClick={redirectToProfile}>
            View Profile
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
