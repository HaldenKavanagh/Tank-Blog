import "../styles/EditPost.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

export default function EditUser() {
  const { username } = useParams();
  const [userData, setUserData] = useState({ username: "", bio: "" });

  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { username },
  });

  useEffect(() => {
    if (data && data.getUser) {
      setUserData({
        username: data.getUser.username,
        bio: data.getUser.bio,
      });
    }
  }, [data]);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleEditUser = async (e) => {
    e.preventDefault();

    try {
      await updateUser({
        variables: {
          userId: data.getUser._id, // Assuming _id is available in the user data
          username: userData.username,
          bio: userData.bio,
        },
      });
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="EditUser">
      <h1 className="contact-title">Edit User</h1>
      <form className="logInForm" onSubmit={handleEditUser}>
        <label htmlFor="username">Username:</label>
        <input
          className="custom-input"
          type="text"
          id="username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          className="custom-input-content"
          id="bio"
          value={userData.bio}
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
        />
        <button className="button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
