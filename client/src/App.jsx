import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";

import isLoginLoader from "./utils/isLogin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/create",
          element: <Create />,
          loader: isLoginLoader,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
          loader: isLoginLoader,
        },
        {
          path: "/notes/:id",
          element: <Details />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
