import { Outlet } from "react-router-dom";

function BoardRoot() {
  return (
    <>
      <p>커뮤니티</p>
      <Outlet />
    </>
  );
}

export default BoardRoot;
