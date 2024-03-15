import "../styles/Profile.css";

import { FaPencil } from "react-icons/fa6";
import { FaTrash, FaCommentAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import AuthService from "../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../utils/mutations";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const handleViewPost = (postId) => {
    window.location.href = `/view-post/${postId}`;
  };

  const handleEditPost = (postId) => {
    window.location.href = `/edit-post/${postId}`;
  };

  const { loading, error, data } = useQuery(GET_LOGGED_IN_USER);

  const [me, setMe] = useState({});

  useEffect(() => {
    if (data) {
      setMe(data.me);
    }
  }, [data]);

  const [deletePost] = useMutation(DELETE_POST);

  const handleDeletePost = async (postId) => {
    console.log(postId);
    try {
      const { data } = await deletePost({
        variables: { postId },
      });

      const deletedPostId = data.deletePost._id;

      const updatedPosts = me.posts.filter(
        (post) => post._id !== deletedPostId
      );

      setMe({
        ...me,
        posts: updatedPosts,
      });
      handleShow();
    } catch (error) {
      console.error("Error deleting post:", error.message);

      alert("Error deleting post. Please try again.");
    }
  };

  return (
    <div className="profilePage">
      <div className="accInfo">
        <h2>Welcome, {me.username}!</h2>
        <p>Email: {me.email}</p>
      </div>

      <h3 className="postsTitle">Your Posts:</h3>
      {me.posts && me.posts.length > 0 ? (
        <div className="cardContainer">
          {me.posts.map((post) => (
            <div className="postCard" key={post._id}>
              <p className="postTitle">{post.postTitle}</p>
              <p className="postBody">{post.postBody}</p>
              <p className="postCreatedAt">
                Created by {me.username} at {post.createdAt}
              </p>
              <div>
                <FaPencil
                  className="profileIcons"
                  onClick={() => handleEditPost(post._id)}
                />
                <FaTrash
                  onClick={() => handleDeletePost(post._id)}
                  className="profileIcons"
                />
                <FaCommentAlt
                  className="profileIcons"
                  onClick={() => handleViewPost(post._id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="noPostsMessage">You have no posts yet.</p>
      )}
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Post deleted successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="createButton" onClick={handleClose}>
            close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
