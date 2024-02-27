import "../styles/Feed.css";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred. Please try again later.</div>;
    }

    return this.props.children;
  }
}

export default function Feed() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.getAllPosts || [];

  return (
    <ErrorBoundary>
      <div className="feedPage">
        <div className="container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {posts.map((post) => (
                <div className="postCard" key={post._id}>
                  <p className="postTitle">{post.postTitle}</p>
                  <p className="postUsername">Author: {post.username}</p>
                  <p className="postBody">{post.postBody}</p>
                  <p className="postCreatedAt">{post.createdAt}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
