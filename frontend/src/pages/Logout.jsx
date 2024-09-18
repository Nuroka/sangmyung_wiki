import { Navigate } from "react-router-dom";
import { removeAuthToken } from "../util/auth";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // logout request axios
    removeAuthToken();
  }, []);

  return <Navigate to={"../"} replace={true} />;
}
