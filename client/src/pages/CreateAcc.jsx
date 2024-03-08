import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../utils/mutations";
import Alert from "react-bootstrap/Alert";
import "../styles/CreateAcc.css";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const redirectToLogin = () => {
    // Consider using React Router for navigation

    window.location.href = "/login";
  };

  const redirectToProfile = () => {
    // Consider using React Router for navigation
    setTimeout(() => {
      window.location.href = "/profile";
    }, 2000);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      console.log("Creating user with:", username, email, password);
      const { data } = await createUser({
        variables: { username, password, email },
      });

      console.log("Server Response:", data);

      const token = data?.createUser?.token;

      if (token) {
        setShow(true);
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
        redirectToProfile();
      } else {
        alert("Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="createAccountPage">
      <h1 className="contact-title">Create an account</h1>
      <div className="createAccount">
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
          <button className="createButton" onClick={redirectToLogin}>
            Back to login
          </button>
        </form>
        {show && (
          <Alert
            className="my-custom-alert"
            variant="success"
            onClose={() => setShow(false)}
            dismissible
          >
            Welcome!
          </Alert>
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
