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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
