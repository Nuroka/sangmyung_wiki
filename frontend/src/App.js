import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/api";

import RootLayout from "./layout/RootLayout";

import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Fileload from "./pages/Fileload";
import Login from "./pages/Login";
import RecentUpdated from "./pages/RecentUpdated";
import BoardList from "./component/board/BoardList";
import BoardDetail from "./component/board/BoardDetail";
import BoardWrite from "./component/board/BoardWrite";
import BoardUpdate from "./component/board/BoardUpdate";
import FindID from "./pages/FindID";
import MyPage from "./pages/MyPage";
import UpdatePw from "./pages/UpdatePw";
import Logout from "./pages/Logout";
import CreateAccountEmailPage from "./pages/CreateAccountEmail";
import CreateAccountIdPage from "./pages/CreateAccountid";

import AuthRoute from "./util/AuthRoute";
import UnauthRoute from "./util/UnauthRoute";
import DefaultRoute from "./util/DefaultRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AuthRoute />, // 로그인 후 접근 가능
        errorElement: <ErrorPage />,
        children: [
          { path: "file", element: <Fileload /> },
          { path: "board", element: <BoardList /> },
          { path: "board/one", element: <BoardDetail /> },
          { path: "write", element: <BoardWrite /> },
          { path: "board/edit/:id", element: <BoardUpdate /> },
          { path: "docs/edit", element: <RecentUpdated /> },
          { path: "mypage", element: <MyPage /> },
          { path: "member/update", element: <UpdatePw /> },
          { path: "logout", element: <Logout /> },
        ],
      },
      {
        path: "/",
        element: <UnauthRoute />, // 로그인 시 접근 불가
        errorElement: <ErrorPage />,
        children: [
          { path: "user", element: <Login /> },
          { path: "findID", element: <FindID /> },
          { path: "createEmail", element: <CreateAccountEmailPage /> },
          { path: "createId", element: <CreateAccountIdPage /> },
        ],
      },
      {
        path: "/",
        element: <DefaultRoute />, // 로그인과 상관없이 접근 가능
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <Home /> }],
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
