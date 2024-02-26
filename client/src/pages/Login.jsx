import "../styles/Login.css";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    alert("Logging out...Successful. Have a good day!");
    //redirect
    console.log("Logged out");
  };

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
        alert("Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="logIn">
      <div className="logInForm">
        <input
          className="custom-input"
          type="text"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          className="custom-input"
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>

        <div className="createAccountButton">
          <button onClick={handleCreateAcc}>Create an account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
