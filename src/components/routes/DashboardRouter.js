import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/user/UserDashboard";
import Profile from "../dashboard/common/Profile";
import UploadPdf from "../dashboard/user/order/Upload";
import Proceed from "../dashboard/user/order/Proceed";
import Order from "../dashboard/user/order/Order";
import ToLogin from "../redirects/ToLogin";
import ToVendor from "../redirects/ToVendor";
import Wallet from "../dashboard/common/Wallet";
import Orders from "../dashboard/user/users/Orders";
import { VendorContext } from "../contexts/VendorContext";
import { OrderContext } from "../contexts/OrderContext";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import VendorDashboard from "../dashboard/vendor/VendorDashboard";
import ToVerifiedDashboard from "../redirects/ToVerifiedDashboard";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import Home from "../home/Home"

const DashboardRouter = () => {
  const {userDetails} = useContext(UserContext)
  const [vendorDetails, setVendorDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState({})
  return (
    <VendorContext.Provider value={{ vendorDetails, setVendorDetails }}>
      <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
        <Routes>
          <Route path="/" element={<ToLogin />}>
            <Route exact path="/" element={<ToVerifiedDashboard />} >
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<ToVendor />}>
                <Route path="/upload" element={<UploadPdf />} />
                <Route path="/proceed" element={<Proceed />} />
                <Route path="/order" element={<Order />} />
              </Route>
            </Route>
            {userDetails.type === "Vendor" && <Route exact path="/vendor" element={<VendorDashboard />} />}
            {userDetails.type === "Admin" && <Route exact path="/admin" element={<AdminDashboard />} />}
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </OrderContext.Provider>
    </VendorContext.Provider>
  );
};
export default DashboardRouter;
