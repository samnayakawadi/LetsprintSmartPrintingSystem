import HomeNavbar from "../bars/Navbars/HomeNavbar";
import DashboardNavbar from "../bars/Navbars/UserNavbar";
import VendorNavbar from "../bars/Navbars/VendorNavbar"
import AdminNavbar from "../bars/Navbars/AdminNavbar"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { userDetails } = useContext(UserContext);

  if(userDetails.type==="Vendor"){
    return userDetails.status ?  <VendorNavbar /> : <HomeNavbar />;  
  }

  else if(userDetails.type==="Admin"){
    return userDetails.status ?  <AdminNavbar /> : <HomeNavbar />;  
  }

  return userDetails.status ? <DashboardNavbar /> : <HomeNavbar />;
};
export default Navbar;
