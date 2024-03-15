import "../styles/Feed.css";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AuthService from "../utils/auth";

export default function Feed() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.getAllPosts || [];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewPost = (postId) => {
    window.location.href = `/view-post/${postId}`;
  };

  const handleViewUser = (username) => {
    if (AuthService.loggedIn()) {
      window.location.href = `/user/${username}`;
    } else {
      handleShow(); // Show modal when user is not logged in
    }
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="background">
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {posts.map((post) => (
              <div className="postCard" key={post._id}>
                <p className="postTitle">{post.postTitle}</p>
                <p className="postBody">{post.postBody}</p>
                <p className="postCreatedAt">
                  created by{" "}
                  <a
                    className="usernameAnchor"
                    onClick={() => handleViewUser(post.username)}
                  >
                    {post.username}
                  </a>{" "}
                  at {post.createdAt}
                </p>
                {AuthService.loggedIn() ? (
                  <button
                    className="button"
                    onClick={() => handleViewPost(post._id)}
                  >
                    View Full Post
                  </button>
                ) : (
                  <button className="button" onClick={handleShow}>
                    View Full Post
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            You must Login or create an account to use this feature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="button" onClick={redirectToLogin}>
            Login
          </Button>
          <Button className="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
