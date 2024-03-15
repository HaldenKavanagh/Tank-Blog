import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../utils/mutations";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/CreateAcc.css";
import "../styles/Modal.css";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const redirectToLogin = () => {
    // Consider using React Router for navigation

    window.location.href = "/login";
  };

  const redirectToProfile = () => {
    handleClose();

    window.location.href = "/profile";
  };

  const redirectToFeed = () => {
    handleClose();

    window.location.href = "/feed";
  };

  const redirectToCreatePost = () => {
    handleClose();

    window.location.href = "/create-post";
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating user with:", username, email, password, bio);
      const { data } = await createUser({
        variables: { username, password, email, bio },
      });

      console.log("Server Response:", data);

      const token = data?.createUser?.token;

      if (token) {
        handleShow;
        handleLogin();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error:", error.message || "An error occurred");
    }
  };

  const handleLogin = async () => {
    console.log("in handlelogin");
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      console.log("data");
      console.log(data);

      const token = data?.login?.token;

      console.log("token");
      console.log(token);

      if (token) {
        // Store the token in local storage
        localStorage.setItem("id_token", token);
        console.log("Login successful");
        handleShow();
      } else {
        alert("Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="createAccountPage ">
      <h1 className="contact-title">Create an account</h1>
      <div className="form">
        <form onSubmit={handleCreateUser}>
          <label htmlFor="username">Username:</label>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="custom-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <label htmlFor="email">Email:</label>
          <div>
            <input
              type="text"
              placeholder="Email"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="email">Bio:</label>
          <div>
            <input
              type="text"
              placeholder="Bio"
              className="custom-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <label htmlFor="password">Password:</label>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <button className="button" onClick={redirectToLogin}>
            Back to login
          </button>
        </form>

        <Modal
          className="modal-container"
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Thanks for Joining ... where to now?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button className="button" onClick={redirectToProfile}>
              View Profile
            </Button>
            <Button className="button" onClick={redirectToFeed}>
              View Feed
            </Button>
            <Button className="button" onClick={redirectToCreatePost}>
              Create a Post
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default CreateAccount;
