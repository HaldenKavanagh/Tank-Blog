import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loginUser] = useMutation(LOGIN_USER);

  const redirectToProfile = () => {
    window.location.href = "/Profile";
  };

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { email: loginEmail, password: loginPassword },
      });
      console.log(data);

      const token = data?.login?.token;

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
    <div>
      <div className="logIn">
        <input
          type="text"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
