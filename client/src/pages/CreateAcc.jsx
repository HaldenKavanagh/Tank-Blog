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

      const token = data?.createUser?.token;
      console.log(token);

      if (token) {
        console.log("Account created successfully");
        alert("Account created successfully!");
        redirectToLogin();
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error.message || "An error occurred");
    }
  };

  return (
    <div className="createAccountPage">
      <div className="createAccount">
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}
