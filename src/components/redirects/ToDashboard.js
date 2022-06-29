import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ToDashboard = () => {
  const { userDetails } = useContext(UserContext);

  if(userDetails.type==="Vendor"){
    return userDetails.status ? <Navigate to="/dashboard/vendor" /> : <Outlet />;  
  }

  else if(userDetails.type === "Admin"){
    return userDetails.status ? <Navigate to="/dashboard/admin" /> : <Outlet />;    
  }

  return userDetails.status ? <Navigate to="/dashboard" /> : <Outlet />;
};
export default ToDashboard;