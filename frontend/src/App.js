import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/api";

import RootLayout from "./layout/RootLayout";

import ErrorPage from "./pages/Error";
import Fileload from "./pages/file/Fileload";
import Login from "./pages/Login";
import RecentEdited from "./pages/docs/RecentEdited";
import FindID from "./pages/member/FindID";
import MyPage from "./pages/member/MyPage";
import UpdatePw from "./pages/member/UpdatePw";
import Logout from "./pages/Logout";
import CreateAccount from "./pages/member/CreateAccount";
import Created from "./pages/member/Created";
import DocsLog from "./pages/docs/DocsLog";
import BoardRoot from "./pages/board/BoardRoot";
import Doc from "./pages/docs/Doc";
import EditDoc from "./pages/docs/EditDoc";
import CreateDoc from "./pages/docs/CreateDoc";

import BoardList from "./component/board/BoardList";
import BoardDetail from "./component/board/BoardDetail";
import BoardWrite from "./component/board/BoardWrite";
import BoardUpdate from "./component/board/BoardUpdate";

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
          {
            path: "/board",
            element: <BoardRoot />,
            children: [
              { index: true, element: <BoardList /> },
              { path: "one", element: <BoardDetail /> },
              { path: "edit/:id", element: <BoardUpdate /> },
            ],
          },
          { path: "file", element: <Fileload /> },
          { path: "write", element: <BoardWrite /> },
          { path: "mypage", element: <MyPage /> },
          { path: "member/update", element: <UpdatePw /> },
          { path: "logout", element: <Logout /> },
          { path: "docs/edit", element: <EditDoc /> },
          { path: "docs/create", element: <CreateDoc /> },
        ],
      },
      {
        path: "/",
        element: <UnauthRoute />, // 로그인 시 접근 불가
        errorElement: <ErrorPage />,
        children: [
          { path: "user", element: <Login /> },
          { path: "findID", element: <FindID /> },
          { path: "signin", element: <CreateAccount /> },
          { path: "created", element: <Created /> },
        ],
      },
      {
        path: "/",
        element: <DefaultRoute />, // 로그인과 상관없이 접근 가능
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Doc state="1" /> },
          { path: "docs/log", element: <DocsLog /> },
          { path: "docs/recommend", element: <Doc /> },
          { path: "docs/recent", element: <RecentEdited /> },
          { path: "doc", element: <Doc /> },
        ],
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
