import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ToDashboard = () => {
  const { userDetails } = useContext(UserContext);

  return userDetails.type === "Vendor" ? <Navigate to="/dashboard/vendor" /> : <Outlet />;
};
export default ToDashboard;