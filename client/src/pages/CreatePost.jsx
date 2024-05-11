import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/Main.css";
import "../styles/Modal.css";

import AuthService from "../utils/auth";

export default function CreatePost() {
  const redirectToFeed = () => {
    window.location.href = "/feed";
  };

  const redirectToProfile = () => {
    window.location.href = "/profile";
  };

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setUsername(AuthService.getUser().data.username);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(username);
  const [createPost] = useMutation(CREATE_POST);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        console.error("Please select an image");
        return;
      }

      const imageFormData = new FormData();
      imageFormData.append("image", image);

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: imageFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const imagePath = await response.text();

      const { data } = await createPost({
        variables: { username, postTitle, postBody, imagePath },
      });

      const post = data?.createPost?.post;

      console.log("Post created successfully");
      handleShow();
    } catch (error) {
      console.error("Error:", error.message || "An error occurred");
    }
  };

  return (
    <div className="background">
      <h1 className="page-title">Create a Post</h1>
      <div className="form">
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
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
