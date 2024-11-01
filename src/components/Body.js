import React, { useEffect } from "react";
import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Watch from "./Watch";

const Body = () => {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path:"/watch/:movieID",
      element:<Watch/>
    }
  ]);

  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default Body;
