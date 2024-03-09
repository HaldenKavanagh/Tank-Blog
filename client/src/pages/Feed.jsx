import "../styles/Feed.css";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

export default function Feed() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.getAllPosts || [];

  const handleViewPost = (postId) => {
    window.location.href = `/view-post/${postId}`;
  };

  const handleViewUser = (username) => {
    window.location.href = `/user/${username}`;
  };

  return (
    <div className="feedPage">
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {posts.map((post) => (
              <div className="postCard" key={post._id}>
                <p className="postTitle">{post.postTitle}</p>
                <p className="postBody">{post.postBody}</p>
                <p className="postCreatedAt">
                  created by{" "}
                  <a className="usernameAnchor" onClick={() => handleViewUser(post.username)}>
                    {post.username}
                  </a>{" "}
                  at {post.createdAt}
                </p>
                <button
                  className="button"
                  onClick={() => handleViewPost(post._id)}
                >
                  View Full Post
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
