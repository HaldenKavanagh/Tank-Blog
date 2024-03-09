import "../styles/EditPost.css";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../utils/mutations";

export default function EditPost() {
  return (
    <div className="EditPost">
      <h1>EDIT POST PAGE</h1>
    </div>
  );
}
