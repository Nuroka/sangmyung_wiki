import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/api";

import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Fileload from "./pages/Fileload";
import Login from "./pages/Login";
import Community from "./pages/Community";
import RecentUpdated from "./pages/RecentUpdated";
import BoardList from "./component/board/BoardList";
import BoardDetail from "./component/board/BoardDetail";
import BoardWrite from "./component/board/BoardWrite";
import BoardUpdate from "./component/board/BoardUpdate";
import FindId from "./pages/FindId";
import MyPage from "./pages/MyPage";
import UpdatePw from "./pages/UpdatePw";
import CreateAccountEmailPage from "./pages/CreateAccountEmail";
import CreateAccountIdPage from "./pages/CreateAccountid";
import IdAuth from "./pages/IdAuth";

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
        element: (
          <>
            <Community />
            <BoardList />
          </>
        ),
      },
      {
        path: "/board/one",
        element: (
          <>
            <Community />
            <BoardDetail />
          </>
        ),
      },
      {
        path: "/write",
        element: (
          <>
            <Community />
            <BoardWrite />
          </>
        ),
      },
      {
        path: "board/update/:idx",
        element: (
          <>
            <Community />
            <BoardUpdate />
          </>
        ),
      },
      {
        path: "docs/edit",
        element: <RecentUpdated />,
      },
      {
        path: "user",
        element: <Login />,
      },
      {
        path: "findId",
        children: [
          {
            index: true,
            element: <FindId />,
          },
          {
            path: "auth",
            element: <IdAuth />,
          },
        ],
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "member/update",
        element: <UpdatePw />,
      },
      {
        path: "createEmail",
        element: <CreateAccountEmailPage />,
      },
      {
        path: "createId",
        element: <CreateAccountIdPage />,
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
