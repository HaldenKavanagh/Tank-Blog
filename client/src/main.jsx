import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import ViewPost from "./pages/ViewPost";
import User from "./pages/User";
import EditPost from "./pages/EditPost";
import EditUser from "./pages/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-acc",
        element: <CreateAcc />,
      },
      {
        path: "/view-post/:postId",
        element: <ViewPost />,
      },
      {
        path: "/user/:username",
        element: <User />,
      },
      {
        path: "/edit-post/:postId",
        element: <EditPost />,
      },
      {
        path: "/edit-user/:username",
        element: <EditUser />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
