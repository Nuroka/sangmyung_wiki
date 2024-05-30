import { Navigate } from "react-router-dom";

export default function Home() {
  return <Navigate to={"/doc"} state={{ id: 1 }} />;
}
