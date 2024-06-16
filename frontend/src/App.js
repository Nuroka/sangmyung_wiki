import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/api";

import RootLayout from "./layout/RootLayout";
import OutletLayout from "./layout/OutletLayout";

import ErrorPage from "./pages/Error";
import Fileload from "./pages/file/Fileload";
import Login from "./pages/Login";
import RecentEdited from "./pages/docs/RecentEdited";
import FindAccount from "./pages/member/FindAccount";
import FindID from "./pages/member/FindID";
import FindPW from "./pages/member/FindPW";
import FindPWAuth from "./pages/member/FindPWAuth";
import MyPage from "./pages/member/MyPage";
import UpdatePw from "./pages/member/UpdatePw";
import Logout from "./pages/Logout";
import CreateAccount from "./pages/member/CreateAccount";
import AccountCreated from "./pages/member/AccountCreated";
import DocsLog from "./pages/docs/DocsLog";
import Doc from "./pages/docs/Doc";
import EditDoc from "./pages/docs/EditDoc";
import CreateDoc from "./pages/docs/CreateDoc";
import Home from "./pages/Home";

import BoardList from "./component/board/BoardList";
import BoardDetail from "./component/board/BoardDetail";
import BoardWrite from "./component/board/BoardWrite";
import BoardUpdate from "./component/board/BoardUpdate";

import AuthRoute from "./util/AuthRoute";
import UnauthRoute from "./util/UnauthRoute";
import DefaultRoute from "./util/DefaultRoute";
import MyDocs from "./pages/docs/MyDocs";
import FindPwResult from "./component/member/FindPwResult";

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
            element: <OutletLayout title="커뮤니티" />,
            children: [
              { index: true, element: <BoardList /> },
              { path: "one", element: <BoardDetail /> },
              { path: "edit/:id", element: <BoardUpdate /> },
              { path: "write", element: <BoardWrite /> },
            ],
          },
          { path: "file", element: <Fileload /> },
          { path: "mypage", element: <MyPage /> },
          { path: "member/update", element: <UpdatePw /> },
          { path: "logout", element: <Logout /> },
          { path: "docs/edit", element: <EditDoc /> },
          { path: "docs/create", element: <CreateDoc /> },
          { path: "mydocs", element: <MyDocs /> },
        ],
      },
      {
        path: "/",
        element: <UnauthRoute />, // 로그인 시 접근 불가
        errorElement: <ErrorPage />,
        children: [
          { path: "user", element: <Login /> },
          { path: "findAccount", element: <FindAccount /> }, // 계정 / 비밀번호 찾기 선택
          {
            path: "signin",
            element: <OutletLayout title="계정 만들기" />,
            children: [
              { index: true, element: <CreateAccount /> },
              { path: "created", element: <AccountCreated /> },
            ],
          },
          {
            path: "findID",
            element: <OutletLayout title="계정 찾기" />,
            children: [{ index: true, element: <FindID /> }],
          },
          {
            path: "findPW",
            element: <OutletLayout title="비밀번호 찾기" />,
            children: [
              { index: true, element: <FindPW /> },
              { path: "auth", element: <FindPWAuth /> },
              { path: "result", element: <FindPwResult /> },
            ],
          },
        ],
      },
      {
        path: "/",
        element: <DefaultRoute />, // 로그인과 상관없이 접근 가능
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
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
