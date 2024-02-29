import React, { useState, useEffect } from "react";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "../utils/queries";

export default function Profile() {
  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const { loading, error, data } = useQuery(GET_LOGGED_IN_USER);

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      redirectToLogin();
      alert("Create an account or Login to view this page");
    }
  }, []);

  

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error fetching user data</p>;
  }

  const { me } = data;
  console.log(me);

  return (
    <div className="profilePage">
      <h1>This Page is uder construction, sorry</h1>
      <h2>Welcome, {me.username}!</h2>
      <p>Email: {me.email}</p>

      <h3>Your Posts:</h3>
      <ul>
        {me.posts.map((post) => (
          <li key={post._id}>
            <strong>{post.postTitle}</strong>: {post.postBody}
          </li>
        ))}
      </ul>
    </div>
  );
}
