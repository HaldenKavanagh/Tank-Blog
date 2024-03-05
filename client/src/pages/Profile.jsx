import "../styles/Profile.css";

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
      <h2>Welcome, {me.username}!</h2>
      <p>Email: {me.email}</p>

      <h3>Your Posts:</h3>
      <div className="cardContainer">
        {me.posts.map((post) => (
          <div className="profileCard" key={post._id}>
            <div>
              <p>post title: {post.postTitle}</p>{" "}
            </div>
            <div>
              <p>post Body: {post.postBody}</p>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
