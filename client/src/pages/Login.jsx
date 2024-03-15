import "../styles/Main.css";
import "../styles/Modal.css";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateAcc = () => {
    window.location.href = "/create-acc";
  };

  const [loginUser] = useMutation(LOGIN_USER);

  const redirectToProfile = () => {
    window.location.href = "/Profile";
  };

  const handleLogin = async () => {
    console.log("in handlelogin");
    try {
      const { data } = await loginUser({
        variables: { email: loginEmail, password: loginPassword },
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
        redirectToProfile();
      } else {
        handleShow();
      }
    } catch (error) {
      handleShow();
    }
  };

  return (
    <div className="background">
      <h1 className="page-title">Login</h1>
      <div className="form">
        <label htmlFor="email">Email:</label>
        <input
          className="custom-input"
          type="text"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>

        <input
          className="custom-input"
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <button className="button" onClick={handleCreateAcc}>
          Create An Account
        </button>

        <Modal
          className="modal-container"
          show={show}
          onHide={handleClose}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Error logging in, make sure to check all fields
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button className="button" onClick={handleCreateAcc}>
              Create an Account
            </Button>
            <Button className="button" onClick={handleClose}>
              close
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
