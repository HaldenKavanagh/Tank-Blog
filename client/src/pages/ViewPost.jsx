import "../styles/ViewPost.css";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_POST } from "../utils/queries";

export default function ViewPost() {
  // Get the postId from the URL using useParams
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const post = data?.getPost;
  console.log(post);

  return <div className="viewPost">VIEWPOST PAGEE</div>;
}
