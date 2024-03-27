import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/api";

import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Fileload from "./pages/Fileload";
import Community from "./pages/Community";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "file",
        element: <Fileload />,
      },
      {
        path: "board",
        element: <Community />,
      },
      {
        path: "user",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;