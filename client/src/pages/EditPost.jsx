import "../styles/EditPost.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import { UPDATE_POST } from "../utils/mutations";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AuthService from "../utils/auth";

export default function EditPost() {
  const { postId } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewPost = (postId) => {
    window.location.href = `/view-post/${postId}`;
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const { loading, data, error } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  useEffect(() => {
    if (data && data.getPost) {
      const { postTitle, postBody } = data.getPost;
      setPostTitle(postTitle);
      setPostBody(postBody);
    }
  }, [data]);

  const [updatePost] = useMutation(UPDATE_POST);

  const handleEditPost = async (e) => {
    e.preventDefault();

    try {
      await updatePost({
        variables: {
          postId,
          postTitle,
          postBody,
        },
      });
      handleShow();
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="background">
      <h1 className="contact-title">Edit Post</h1>
      <form className="logInForm" onSubmit={handleEditPost}>
        <label htmlFor="postTitle">Title:</label>
        <input
          className="custom-input"
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
          className="custom-input-large"
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button className="button" type="submit">
          Save Changes
        </button>
      </form>
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Successful!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Button
            className="button"
            onClick={() => handleViewPost(postId)}
          >
            View Post
          </Button>
          <Button className="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
