import "../styles/CreateAcc.css";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const redirectToLogin = () => {
    // Consider using React Router for navigation
    window.location.href = "/login";
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
      console.log("Account created successfully");
      alert("Account created successfully!");
      redirectToLogin();
    } else {
      console.error("Token not present in the server response");
      alert("Failed to create account. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
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
        {error && (
          <p style={{ color: "red" }}>Error: Please fill out all fields</p>
        )}
      </div>
    </div>
  );
}
