import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { VendorContext } from "../contexts/VendorContext";

const ToDashboard = () => {
  const { vendorDetails } = useContext(VendorContext);

  return vendorDetails.selected ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default ToDashboard;
