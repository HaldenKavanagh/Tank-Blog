import React, { useState, useEffect } from "react";
import AuthService from "../utils/auth";

export default function Profile() {

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      redirectToLogin();
      alert("Create an account or Login to view this page");
    }
  }, []);

  return (
    <div className="profilePage">
      <p>profile page</p>
    </div>
  );
}
