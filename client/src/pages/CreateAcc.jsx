import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../utils/mutations";
export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const redirectToLogin = () => {
    window.location.href = "/login";
  };
  const handleCreateUser = async () => {
    try {
      const { data } = await createUser({
        variables: { username, password, email },
      });

      const token = data?.createUser?.token;

      if (token) {
        // Redirect or perform actions upon successful account creation
        console.log("Account created successfully");
        alert("Account created successfully! Please login to begin shopping.");
        redirectToLogin();
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="createAccountPage">
      <div className="createAccount">
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

        <button onClick={handleCreateUser}>Create Account</button>
      </div>
    </div>
  );
}
