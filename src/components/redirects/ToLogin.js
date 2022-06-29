import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ToLogin = () => {
  const { userDetails } = useContext(UserContext);

  return userDetails.status ? <Outlet /> : <Navigate to="/login" />;
};
export default ToLogin;
