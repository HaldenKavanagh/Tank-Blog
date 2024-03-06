import "../styles/Profile.css";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react"; // Add useState here
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../utils/mutations";

export default function Profile() {
  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const { loading, error, data } = useQuery(GET_LOGGED_IN_USER);

  const [me, setMe] = useState({}); // State variable to store user data

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      redirectToLogin();
      alert("Create an account or Login to view this page");
    }
  }, []);

  useEffect(() => {
    // Update the user data when it's available
    if (data) {
      setMe(data.me);
    }
  }, [data]);

  const [deletePost] = useMutation(DELETE_POST);

  const handleDeletePost = async (postId) => {
    console.log(postId);
    try {
      const { data } = await deletePost({
        variables: { postId },
      });

      const deletedPostId = data.deletePost._id;

      const updatedPosts = me.posts.filter(
        (post) => post._id !== deletedPostId
      );

      setMe({
        ...me,
        posts: updatedPosts,
      });

      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error.message);

      alert("Error deleting post. Please try again.");
    }
  };

  return (
    <div className="profilePage">
      <h2>Welcome, {me.username}!</h2>
      <p>Email: {me.email}</p>

      <h3>Your Posts:</h3>
      <div className="cardContainer">
        {me.posts &&
          me.posts.map((post) => (
            <div className="postCard" key={post._id}>
              <p className="postTitle">
                {post.postTitle}
                <div>
                  <FaPencil className="profileIcons" />
                  <FaTrash
                    onClick={() => handleDeletePost(post._id)}
                    className="profileIcons"
                  />
                </div>
              </p>
              <p className="postBody">{post.postBody}</p>
              <p className="postCreatedAt">
                created by {post.username} at {post.createdAt}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
