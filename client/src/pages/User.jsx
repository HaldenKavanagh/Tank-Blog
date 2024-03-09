import "../styles/User.css";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

import AuthService from "../utils/auth";

export default function User() {
  const redirectToProfile = () => {
    window.location.href = "/profile";
  };

  const handleViewPost = (postId) => {
    window.location.href = `/view-post/${postId}`;
  };

  const { username } = useParams();
  console.log(username);

  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { username },
  });

  const user = data?.getUser;

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        if (AuthService.loggedIn()) {
          const meUsername = AuthService.getUser().data?.username;
          if (username === meUsername) {
            // Redirect to profile if the user is viewing their own posts
            redirectToProfile();
          }
        } else {
          // Allow non-logged-in users to view the page
          alert("Non-logged in users can view this page.");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkUserAuthentication();
  }, [username]);

  return (
    <div className="User">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {user && (
        <>
          <h2 className="userTitle">{user.username}'s Posts</h2>

          {user.posts && user.posts.length > 0 ? (
            <div className="cardContainer">
              {user.posts.map((post) => (
                <div className="postCard" key={post._id}>
                  <p className="postTitle">{post.postTitle}</p>
                  <p className="postBody">{post.postBody}</p>
                  <p className="postCreatedAt">
                    Created by {user.username} at {post.createdAt}
                  </p>
                  <button
                    className="button"
                    onClick={() => handleViewPost(post._id)}
                  >
                    View Full Post
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="noPostsMessage">You have no posts yet.</p>
          )}
        </>
      )}
    </div>
  );
}
