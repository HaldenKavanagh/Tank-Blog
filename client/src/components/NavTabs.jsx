import React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../utils/auth";
import "../styles/NavTabs.css";

function NavTabs() {
  const location = useLocation();

  const getPageName = (pathname) => {
    const pageName = pathname.substring(1);
    
    return pageName === "" ? "Home" : pageName;
  };

  const renderAuthButton = () => {
    // Check if the user is logged in
    if (AuthService.loggedIn()) {
      return (
        <Link onClick={AuthService.logout} className="nav-link">
          <p>Logout</p>
        </Link>
      );
    } else {
      return (
        <Link
          to="/login"
          className={
            getPageName(location.pathname) === "Login"
              ? "nav-link active"
              : "nav-link"
          }
        >
          <p>Login</p>
        </Link>
      );
    }
  };

  return (
    <div className="navbar">
      <Link
        to="/feed"
        className={
          getPageName(location.pathname) === "feed"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <p>Feed</p>
      </Link>
      <Link
        to="/create-post"
        className={
          getPageName(location.pathname) === "create-post"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <p>Create a Post</p>
      </Link>
      <Link
        to="/profile"
        className={
          getPageName(location.pathname) === "profile"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <p>Profile</p>
      </Link>
      {/* <Link
        to="/Login"
        className={
          getPageName(location.pathname) === "Login"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <p>Login</p>
      </Link> */}
      {renderAuthButton()}
    </div>
  );
}

export default NavTabs;
