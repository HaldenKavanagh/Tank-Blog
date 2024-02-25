import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

export default function CreatePost() {
  const [username, setUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const redirectToFeed = () => {
    // Consider using React Router for navigation
    window.location.href = "/feed";
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating Post with:", username, postTitle, postBody);
      const { data } = await createPost({
        variables: { username, postTitle, postBody },
      });

      const post = data?.createPost?.post;
      redirectToFeed();
      console.log("Post created successfully");
      alert("Post created successfully!");
      // if (post) {
      //   console.log("Post created successfully");
      //   alert("Post created successfully!");
      //   redirectToFeed();
      // } else {
      //   alert("Failed to create post");
      // }
    } catch (error) {
      console.error("Error:", error.message || "An error occurred");
    }
  };

  return (
    <div className="createPostPage">
      <div className="createPost">
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Content"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>

        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}
