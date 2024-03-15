import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../utils/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Main.css";
import "../styles/NavTabs.css";

function NavTabs() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const redirectToLogin = () => {
    window.location.href = "/login";
  };
  const redirectToFeed = () => {
    window.location.href = "/feed";
  };

  const checkLoggedIn = () => {
    if (!AuthService.loggedIn()) {
      handleShow();
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
        onClick={checkLoggedIn}
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
        onClick={checkLoggedIn}
        className={
          getPageName(location.pathname) === "profile"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <p>Profile</p>
      </Link>
      {renderAuthButton()}
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            You must Login or create an account to visit this page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="button" onClick={redirectToLogin}>
            Login
          </Button>
          <Button className="button" onClick={redirectToFeed}>
            Back to Feed
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavTabs;
